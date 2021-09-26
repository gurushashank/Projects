package DatabaseOperations;

import Parser.ParseQuery;
import org.apache.log4j.Logger;

import javax.xml.stream.events.StartDocument;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Scanner;
import java.util.regex.Pattern;

public class Transaction {

    // record the queries to be executed in an arraylist

    // list of all files at source directory

    // hashmap to record transaction log column names and corresponding indexes
    HashMap<Integer, String> trxColumnIndexes = new HashMap<Integer, String>();

    // current transaction log information
    HashMap<String, String> trxCurrent = new HashMap<String, String>();

    private String siteSelected = null;

    // logger for select query
    static Logger logger= Logger.getLogger(Transaction.class);

    long start= System.currentTimeMillis();

    public Transaction(String siteSelected) {
        this.siteSelected = siteSelected;
    }

    // data structure for storing roll back information
    HashMap<String,ArrayList<ArrayList<String>>> rollbackInfo = new HashMap<String,ArrayList<ArrayList<String>>>();

    public void parseQuery(String userQuery){
        // check if user query starts and ends with transaction and commit respectively
        /*String regexTransaction = "(start)\\s(transaction).*(commit;)";
        boolean matchTransaction = Pattern.compile(regexTransaction, Pattern.CASE_INSENSITIVE).matcher(userQuery).matches();

        if (!matchTransaction){
            System.out.println("transaction query not found");
        }*/

        String transactionFile = "transactionLog.txt";

        // get all file names in the source path
        File folder = new File("./");
        File[] listOfFiles = folder.listFiles();
        ArrayList<String> allFiles = new ArrayList<String>();
        for (int i = 0; i < listOfFiles.length; i++) {
            if (listOfFiles[i].isFile()) {
                allFiles.add(listOfFiles[i].getName());
            }
        }
        if (!allFiles.contains(transactionFile)){
            // if transaction log file doesn't exit in the source files then create a new transaction log
            System.out.println("transaction file doesn't exit");
            try {
                FileWriter myWriter = new FileWriter(transactionFile);
                String trxLogColumns = "TRL_ID;TRX_NUM;PREV_PTR;NEXT_PTR;OPERATION;TABLE;ROW_ID;ATTRIBUTE;BEFORE_VALUE;AFTER_VALUE;";
                myWriter.write(trxLogColumns);

                // get transaction column indexes
                String[] trxColumns = trxLogColumns.split(";");
                for (int i = 0; i < trxColumns.length; i++){
                    trxColumnIndexes.put(i, trxColumns[i]);
                    trxCurrent.put(trxColumns[i], "null");
                }

                myWriter.close();
            } catch (IOException e) {
                System.out.println("An error occurred.");
                e.printStackTrace();
            }
        } else {
            String trxLogColumns = "TRL_ID;TRX_NUM;PREV_PTR;NEXT_PTR;OPERATION;TABLE;ROW_ID;ATTRIBUTE;BEFORE_VALUE;AFTER_VALUE;";

            // get transaction column indexes
            String[] trxColumns = trxLogColumns.split(";");
            for (int i = 0; i < trxColumns.length; i++){
                trxColumnIndexes.put(i, trxColumns[i]);
                trxCurrent.put(trxColumns[i], "null");
            }
        }

        // get series of queries
        String[] queries = userQuery.split(";");

        // perform series of queries
        for (int i = 0; i < queries.length; i++){

            // if starting transaction then update log with start transaction information
            if ((i == 0) && (queries[i].split(" ")[0].equalsIgnoreCase("start"))){

                // open the transaction log file
                try {
                    FileWriter trxTemp = new FileWriter("temp.txt");

                    File trxFile = new File(transactionFile);
                    Scanner myReader = new Scanner(trxFile);

                    int lineTracker = 0;
                    while (myReader.hasNextLine()) {
                        // iterate over the transaction log and add data if previous transaction was present
                        String data = myReader.nextLine();

                        // write fist line to temp file
                        trxTemp.write(data);
                        trxTemp.write("\n");

                        // update current transaction log record with current file data
                        if (lineTracker > 0){
                            String[] trxCurrentRecord = data.split(";");
                            for (int j = 0; j < trxCurrentRecord.length; j++){
                                trxCurrent.put(trxColumnIndexes.get(j), trxCurrentRecord[j]);
                            }
                        }
                        lineTracker += 1;
                    }

                    // add data if previous transaction was not present
                    // if line at index 1 does not have any data meaning value of line tracker is 1,write data
                    if (lineTracker == 1){
                        // write new line character


                        // update current transaction log hashmap with new data
                        trxCurrent.put("TRL_ID", "0");
                        trxCurrent.put("TRX_NUM", "0");
                        trxCurrent.put("PREV_PTR", "null");
                        trxCurrent.put("NEXT_PTR",String.valueOf(Integer.parseInt(trxCurrent.get("TRL_ID")) + 10));
                        trxCurrent.put("OPERATION", "start");
                        trxCurrent.put("TABLE", "Start_Transaction");

                    } else if (lineTracker > 1){
                        // update file with new transaction record information from last transaction record
                        trxCurrent.put("TRL_ID", String.valueOf(Integer.parseInt(trxCurrent.get("TRL_ID")) + 1));
                        trxCurrent.put("TRX_NUM", String.valueOf(Integer.parseInt(trxCurrent.get("TRX_NUM")) + 1));
                        trxCurrent.put("PREV_PTR", "null");
                        trxCurrent.put("NEXT_PTR", String.valueOf(Integer.parseInt(trxCurrent.get("TRL_ID")) + 10));
                        trxCurrent.put("OPERATION", "start");
                        trxCurrent.put("TABLE", "Start_Transaction");

                        trxCurrent.put("ROW_ID", "null");
                        trxCurrent.put("ATTRIBUTE", "null");
                        trxCurrent.put("BEFORE_VALUE", "null");
                        trxCurrent.put("AFTER_VALUE", "null");
                    }

                    // write new transaction log record to new file
                    for (int trxColumnIndex : trxColumnIndexes.keySet()){
                        trxTemp.write(trxCurrent.get(trxColumnIndexes.get(trxColumnIndex)));
                        trxTemp.write(";");
                    }

                    // close and delete opened table file
                    myReader.close();
                    trxFile.delete();

                    // rename from temp to table file name and write new table file
                    trxTemp.close();
                    File oldFile = new File("temp.txt");
                    File newFile = new File(transactionFile);
                    oldFile.renameTo(newFile);
                } catch (Exception e) {
                    System.out.println("An error occurred.");
                    e.printStackTrace();
                }
            }

            if ((i > 0) && (i<queries.length-1)){

                // get parser
                String queryType = ParseQuery.parseToIdentifySqlOperation(queries[i]);

                // check and perform select query
                if (queryType.equals("select")){
                    SelectQuery selectQuery = new SelectQuery(siteSelected);
                    selectQuery.readFile(queries[i]);
                    selectQuery.printResult();
                }

                // check and perform update query
                if (queryType.equals("update")){

                    UpdateQuery updateQuery = new UpdateQuery(siteSelected);
                    String tableName = updateQuery.getSetQuery(queries[i]);

                    // save current status in a variable
                    String currentLock = "unknown";

                    // check if table status check text file exists
                    if (!allFiles.contains("checkStatus.txt")){
                        // initialize a checkStatus file for adding table status information
                        try {
                            FileWriter checkStatusFile = new FileWriter("checkStatus.txt");
                            checkStatusFile.write("Table_Name;Lock_Status;");

                            // get all table names
                            for (String file : allFiles){

                                String[] fullFile = file.split("_");
                                if (fullFile.length == 2){
                                    String tableFile = fullFile[0];
                                    String fileType = fullFile[1];


                                    // if file name has Values String then add it to existing table names
                                    if (fileType.equals("Values.txt")){
                                        checkStatusFile.write("\n");
                                        checkStatusFile.write(tableFile);
                                        checkStatusFile.write(";");
                                        checkStatusFile.write("unlocked");
                                        checkStatusFile.write(";");
                                    }
                                }
                            }
                            checkStatusFile.close();
                        } catch (Exception e) {
                            System.out.println("An error occurred.");
                            e.printStackTrace();
                        }
                    } else{
                        while (!currentLock.equals("unlocked")){
                            // if check status file present then look for the status of current table
                            try {
                                FileWriter checkTemp = new FileWriter("checktemp.txt");

                                File checkFile = new File("checkStatus.txt");
                                Scanner myReader = new Scanner(checkFile);

                                int lineTracker = 0;
                                while (myReader.hasNextLine()) {
                                    String data = myReader.nextLine();

                                    String[] fullLine = data.split(";");
                                    String checkTable = fullLine[0];
                                    String currentStatus = fullLine[1];

                                    // go through file and fine the current table to update
                                    if (checkTable.equals(tableName)){

                                        // check if status is unlocked
                                        if (currentStatus.equals("unlocked")){
                                            currentLock = "unlocked";
                                            currentStatus = "locked";
                                        }
                                    }

                                    if (lineTracker == 0){
                                        checkTemp.write(data);
                                    } else {
                                        // write read data to temporary check file
                                        checkTemp.write("\n");
                                        checkTemp.write(checkTable);
                                        checkTemp.write(";");
                                        checkTemp.write(currentStatus);
                                    }
                                    lineTracker += 1;
                                }

                                myReader.close();
                                checkFile.delete();

                                // rename from temp to table file name and write new table file
                                checkTemp.close();
                                File oldFile = new File("checktemp.txt");
                                File newFile = new File("checkStatus.txt");
                                oldFile.renameTo(newFile);
                            } catch (Exception e) {
                                System.out.println("An error occurred.");
                                e.printStackTrace();
                            }
                        }
                    }

                    updateQuery.updateRecord(queries[i]);
                    ArrayList<HashMap<String, String>> trxUpdateInfo = updateQuery.getTrxUpdateRecord();

                    try {
                        FileWriter trxTemp = new FileWriter("temp.txt");

                        File trxFile = new File(transactionFile);
                        Scanner myReader = new Scanner(trxFile);

                        int lineTracker = 0;
                        while (myReader.hasNextLine()) {
                            // iterate over the transaction log and add data if previous transaction was present
                            String data = myReader.nextLine();

                            // write fist line to temp file
                            trxTemp.write(data);
                            trxTemp.write("\n");

                            // update current transaction log record with current file data
                            if (lineTracker > 0){
                                String[] trxCurrentRecord = data.split(";");

                                // update current transaction record only if transaction number matches with start transaction record
                                if (trxCurrent.get("TRX_NUM").equals(trxCurrentRecord[2])){
                                    for (int j = 0; j < trxCurrentRecord.length; j++){
                                        trxCurrent.put(trxColumnIndexes.get(j), trxCurrentRecord[j]);
                                    }
                                }
                            }
                            lineTracker += 1;
                        }

                        // update and write transaction for nested update operations
                        for (HashMap<String, String> updateRecord : trxUpdateInfo){
                            // update file with new transaction record information from last transaction record
                            trxCurrent.put("PREV_PTR", trxCurrent.get("TRL_ID"));
                            trxCurrent.put("TRL_ID", trxCurrent.get("NEXT_PTR"));
                            trxCurrent.put("NEXT_PTR", String.valueOf(Integer.parseInt(trxCurrent.get("TRL_ID")) + 10));
                            trxCurrent.put("OPERATION", "update");

                            trxCurrent.put("TABLE", tableName);
                            trxCurrent.put("ROW_ID", updateRecord.get("ROW_ID"));
                            trxCurrent.put("ATTRIBUTE", updateRecord.get("ATTRIBUTE"));
                            trxCurrent.put("BEFORE_VALUE", updateRecord.get("BEFORE_VALUE"));
                            trxCurrent.put("AFTER_VALUE", updateRecord.get("AFTER_VALUE"));

                            // add information to a roll back
                            ArrayList<ArrayList<String>> listsUpdate = rollbackInfo.get(tableName);
                            ArrayList<String> tempRollback = new ArrayList<String>();
                            tempRollback.add(updateRecord.get("ROW_ID"));
                            tempRollback.add(updateRecord.get("ATTRIBUTE"));
                            tempRollback.add(updateRecord.get("BEFORE_VALUE"));
                            listsUpdate.add(tempRollback);

                            // write new transaction log record to new file
                            for (int trxColumnIndex : trxColumnIndexes.keySet()){
                                trxTemp.write(trxCurrent.get(trxColumnIndexes.get(trxColumnIndex)));
                                trxTemp.write(";");
                            }
                        }

                        // close and delete opened table file
                        myReader.close();
                        trxFile.delete();

                        // rename from temp to table file name and write new table file
                        trxTemp.close();
                        File oldFile = new File("temp.txt");
                        File newFile = new File(transactionFile);
                        oldFile.renameTo(newFile);
                    } catch (Exception e) {
                        System.out.println("An error occurred.");
                        e.printStackTrace();
                    }


                    // lock the table as update operation and logging into transaction log has finished
                    try {
                        FileWriter checkTemp = new FileWriter("checktemp.txt");

                        File checkFile = new File("checkStatus.txt");
                        Scanner myReader = new Scanner(checkFile);

                        int lineTracker = 0;
                        while (myReader.hasNextLine()) {
                            String data = myReader.nextLine();

                            String[] fullLine = data.split(";");
                            String checkTable = fullLine[0];
                            String currentStatus = fullLine[1];

                            // go through file and fine the current table to update
                            if (checkTable.equals(tableName)){
                                currentStatus = "unlocked";
                            }

                            if (lineTracker == 0){
                                checkTemp.write(data);
                            } else {
                                // write read data to temporary check file
                                checkTemp.write("\n");
                                checkTemp.write(checkTable);
                                checkTemp.write(";");
                                checkTemp.write(currentStatus);
                                checkTemp.write(";");
                            }
                            lineTracker += 1;
                        }
                        myReader.close();
                        checkFile.delete();

                        // rename from temp to table file name and write new table file
                        checkTemp.close();
                        File oldFile = new File("checktemp.txt");
                        File newFile = new File("checkStatus.txt");
                        oldFile.renameTo(newFile);
                    } catch (Exception e) {
                        System.out.println("An error occurred.");
                        e.printStackTrace();
                    }


                }
            }

            // check and update transaction log for commit
            if ((i == queries.length-1) && (queries[i].split(" ")[0].equalsIgnoreCase("commit"))){

                try {
                    FileWriter trxTemp = new FileWriter("temp.txt");

                    File trxFile = new File(transactionFile);
                    Scanner myReader = new Scanner(trxFile);

                    int lineTracker = 0;
                    while (myReader.hasNextLine()) {
                        // iterate over the transaction log and add data if previous transaction was present
                        String data = myReader.nextLine();

                        // write fist line to temp file
                        trxTemp.write(data);
                        trxTemp.write("\n");

                        // update current transaction log record with current file data
                        if (lineTracker > 0){
                            String[] trxCurrentRecord = data.split(";");

                            // update current transaction record only if transaction number matches with start transaction record
                            if (trxCurrent.get("TRX_NUM").equals(trxCurrentRecord[2])){
                                for (int j = 0; j < trxCurrentRecord.length; j++){
                                    trxCurrent.put(trxColumnIndexes.get(j), trxCurrentRecord[j]);
                                }
                            }
                        }
                        lineTracker += 1;
                    }

                    // update file with new transaction record information from last transaction record
                    trxCurrent.put("PREV_PTR", trxCurrent.get("TRL_ID"));
                    trxCurrent.put("TRL_ID", trxCurrent.get("NEXT_PTR"));
                    trxCurrent.put("NEXT_PTR", "null");
                    trxCurrent.put("OPERATION", "commit");
                    trxCurrent.put("TABLE", "end_of_Transaction");

                    trxCurrent.put("ROW_ID", "null");
                    trxCurrent.put("ATTRIBUTE", "null");
                    trxCurrent.put("BEFORE_VALUE", "null");
                    trxCurrent.put("AFTER_VALUE", "null");

                    // write new transaction log record to new file
                    for (int trxColumnIndex : trxColumnIndexes.keySet()){
                        trxTemp.write(trxCurrent.get(trxColumnIndexes.get(trxColumnIndex)));
                        trxTemp.write(";");
                    }

                    // close and delete opened table file
                    myReader.close();
                    trxFile.delete();

                    // rename from temp to table file name and write new table file
                    trxTemp.close();
                    File oldFile = new File("temp.txt");
                    File newFile = new File(transactionFile);
                    oldFile.renameTo(newFile);
                } catch (Exception e) {
                    System.out.println("An error occurred.");
                    e.printStackTrace();
                }
            }
        }

        long end = System.currentTimeMillis();
        long executiontime = end-start;
        System.out.println("execution time in millis:"+executiontime);
        logger.info(("Execution time for the transaction is :"+executiontime +"  milliseconds"));

    }

    public void rollBackUpdates(){

        for (String currentTable : this.rollbackInfo.keySet()){

            ArrayList<ArrayList<String>> listUpdates = this.rollbackInfo.get(currentTable);
            HashMap<String, Integer> columNam = new HashMap<String, Integer>();

            try {
                FileWriter trxTemp = new FileWriter(siteSelected +"/"+"temp.txt");

                File trxFile = new File(siteSelected +"/"+currentTable + "_Values.txt");
                Scanner myReader = new Scanner(trxFile);

                int lineTracker = 0;
                while (myReader.hasNextLine()) {
                    // iterate over the transaction log and add data if previous transaction was present
                    String data = myReader.nextLine();
                    String[] columnNames = data.split(";");

                    if (lineTracker == 0){
                        for (int i = 0; i < columnNames.length; i++){
                            columNam.put(columnNames[i], i);
                        }

                    }

                    for (ArrayList<String> oneUpdate : listUpdates){

                        if (String.valueOf(lineTracker-1).equals(oneUpdate.get(0))){
                            columnNames[columNam.get(oneUpdate.get(1))] = oneUpdate.get(2);
                        }
                    }
                    lineTracker += 1;

                    for (String tempCol : columnNames){
                        trxTemp.write(tempCol);
                        trxTemp.write(";");
                    }
                    trxTemp.write("\n");
                }


                myReader.close();
                trxFile.delete();

                // rename from temp to table file name and write new table file
                trxTemp.close();
                File oldFile = new File(siteSelected +"/"+"temp.txt");
                File newFile = new File(siteSelected +"/"+currentTable + "_Values.txt");
                oldFile.renameTo(newFile);

            } catch (Exception e) {
                System.out.println("An error occurred.");
                e.printStackTrace();
            }
        }
    }


}
