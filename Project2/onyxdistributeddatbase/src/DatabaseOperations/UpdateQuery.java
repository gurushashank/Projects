package DatabaseOperations;
import org.apache.log4j.Logger;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Scanner;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class UpdateQuery {

    // hashmap for mapping SET column names to column indexes
    public final HashMap<String, Integer> setColumnIndexes = new HashMap<String, Integer>();

    // hashmap for mapping SET column names to column values
    public final HashMap<String, String> setConditions = new HashMap<String, String>();

    // hashmap to store mapping from where condition column name to indexes
    public final HashMap<String, Integer> whereColumns = new HashMap<String, Integer>();

    // hashmap for mapping where condition columns to condition value
    public final HashMap<String, String> columnConditions = new HashMap<String, String>();

    // hashmap for transaction log file UPDATE record information
    public ArrayList<HashMap<String, String>> trxUpdateInfo = new ArrayList<HashMap<String, String>>();

    public boolean whereExists = false;

    DataValidation dataValidate = new DataValidation();

    // logger for select query
    static Logger logger= Logger.getLogger(UpdateQuery.class);

    long start= System.currentTimeMillis();

    private String siteSelected = null;

    public UpdateQuery(String siteSelected) {
        this.siteSelected = siteSelected;
    }

    // get table name, set column names and values and also where condition column properties
    public String getSetQuery(String userQuery){
        // parse select query and get table name
        String[] queryString = userQuery.split(" ");

        // initialize table name
        String tableName = "";

        // check if where is present
        Pattern patternWh = Pattern.compile("where",Pattern.CASE_INSENSITIVE);
        Matcher matcherWh = patternWh.matcher(userQuery);

        if (matcherWh.find()){
            this.whereExists = true;

            // get table name when where is used
            Pattern patternTb = Pattern.compile("update(.*)set",Pattern.CASE_INSENSITIVE);
            Matcher matcherTb = patternTb.matcher(userQuery);
            while (matcherTb.find()) {
                tableName = matcherTb.group(1).trim();
            }

            // get where condition column and corresponding value to match
            String[] lastString = queryString[queryString.length-1].split("=");
            String conditionColumn = lastString[0].trim();
            String conditionValue = lastString[1].trim();
            conditionValue = conditionValue.replace(";","");

            this.whereColumns.put(conditionColumn, -1);
            this.columnConditions.put(conditionColumn, conditionValue);

            // validate if where condition columns exist

            // get SET column names and corresponding column values
            Pattern patternSet = Pattern.compile("set(.*)where",Pattern.CASE_INSENSITIVE);
            Matcher matcherSet = patternSet.matcher(userQuery);
            String[] setColumns = new String[0];
            while (matcherSet.find()) {
                setColumns = matcherSet.group(1).trim().split(",");
            }
            for (int i = 0; i < setColumns.length; i++){
                String[] columnValuePair = setColumns[i].split("=");
                String setColumnName = columnValuePair[0].trim();
                String setColumnValue = columnValuePair[1].trim();
                this.setConditions.put(setColumnName, setColumnValue);
            }
        } else {
            tableName = queryString[queryString.length-1];
            if (tableName.contains(";")){
                tableName = tableName.substring(0, tableName.length()-1);
            }
        }

        // retrieve table column data type information
        dataValidate.readDatatype(tableName);

        return tableName;
    }

    public void updateRecord(String userQuery){

        String tableName = getSetQuery(userQuery);
        int lineCounter = 0;
        // read table file
        try {

            FileWriter myWriter = new FileWriter(siteSelected+"/"+"temp.txt");

            File tableFile = new File(siteSelected+"/"+tableName + "_Values.txt");
            Scanner myReader = new Scanner(tableFile);

            while (myReader.hasNextLine()) {
                // read each line
                String data = myReader.nextLine();
                String[] colValues = data.split(";");

                // check if line is blank
                if (data.length() == 0) {
                    break;
                }

                // get column names and store in a new temp text file
                if (lineCounter == 0){
                    // write column name data to temp file
                    myWriter.write(data);
                    myWriter.write("\n");

                    // get column index of where condition column
                    ArrayList<String> tempNames = new ArrayList<String>();
                    Collections.addAll(tempNames, colValues);
                    for (String whereCol : this.whereColumns.keySet()){
                        int whereColIndex = tempNames.indexOf(whereCol);
                        this.whereColumns.put(whereCol, whereColIndex);
                    }

                    // get set column indexes
                    for (String setCol : this.setConditions.keySet()){
                        int setColumnIndex = tempNames.indexOf(setCol);
                        this.setColumnIndexes.put(setCol, setColumnIndex);
                    }

                } else {
                    boolean whereCondition = false;
                    // check if where column satisfies where condition
                    for (String whereCol : this.whereColumns.keySet()){
                        int whereColIndex = this.whereColumns.get(whereCol);
                        if (this.columnConditions.get(whereCol).equals(colValues[whereColIndex])){
                            whereCondition = true;
                        }
                    }

                    // if where condition is satisfied update the temporary txt file
                    if (whereCondition){
                        for (String columnName : this.setConditions.keySet()) {
                            int colIndex = this.setColumnIndexes.get(columnName);
                            String colData = this.setConditions.get(columnName).replaceAll("^\'|\'$", "");
                            // validate column data
                            dataValidate.validate(columnName, colData);

                            // update transaction UPDATE hashmap
                            HashMap<String, String> tempTrxMap = new HashMap<String, String>();
                            tempTrxMap.put("ROW_ID", String.valueOf(lineCounter-1));
                            tempTrxMap.put("ATTRIBUTE", columnName);
                            tempTrxMap.put("BEFORE_VALUE", colValues[colIndex]);
                            tempTrxMap.put("AFTER_VALUE", colData);

                            // add temporary hashmap to transaction list of update column changes
                            trxUpdateInfo.add(tempTrxMap);
                            // update column with new value
                            colValues[colIndex] = colData;
                        }
                        StringBuilder concatString = new StringBuilder();
                        for (String colValue : colValues){
                            concatString.append(colValue);
                            concatString.append(";");
                        }
                        myWriter.write(String.valueOf(concatString));
                        myWriter.write("\n");

                    } else {
                        myWriter.write(data);
                        myWriter.write("\n");
                    }
                }
                lineCounter += 1;
            }

            // close and delete opened table file
            myReader.close();
            tableFile.delete();

            // rename from temp to table file name and write new table file
            myWriter.close();
            File oldFile = new File(siteSelected+"/"+"temp.txt");
            File newFile = new File(siteSelected+"/"+tableName + "_Values.txt");
            oldFile.renameTo(newFile);


        } catch (Exception e) {
            System.out.println("An error occurred.");
            e.printStackTrace();
            System.exit(1);
        }

        long end = System.currentTimeMillis();
        long executiontime = end-start;
        System.out.println("execution time in millis:"+executiontime);
        logger.info(("Execution time for update query is :"+executiontime +"  milliseconds"));

    }

    // get transaction log UPDATE data
    public ArrayList<HashMap<String, String>> getTrxUpdateRecord(){
        return trxUpdateInfo;
    }

}
