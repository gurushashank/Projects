package DatabaseOperations;

import org.apache.log4j.Logger;

import javax.crypto.AEADBadTagException;
import java.io.File;
import java.io.FileNotFoundException;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class SelectQuery {

    // hashmap to record all values of the table
    private final HashMap<String, ArrayList<Object>> data_table = new HashMap<String, ArrayList<Object>>();

    // list to record column names
    private final ArrayList<String> columnNames = new ArrayList<String>();

    // list to record individual column value character size
    private final HashMap<String, Integer> colCharSize = new HashMap<String, Integer>();

    // map of indexes of selected columns with respect to table file
    private final HashMap<String, Integer> columnIndex = new HashMap<String, Integer>();

    // list to record selected columns
    private final ArrayList<String> selectNames = new ArrayList<String>();

    // hashmap to store mapping from where condition column name to indexes
    public final HashMap<String, Integer> whereColumns = new HashMap<String, Integer>();

    // hashmap for mapping where condition columns to condition value
    public final HashMap<String, String> columnConditions = new HashMap<String, String>();

    // logger for select query
    static Logger logger= Logger.getLogger(SelectQuery.class);

    public boolean whereExists = false;

    private String siteSelected = null;

    public SelectQuery(String siteSelected) {
        this.siteSelected = siteSelected;
    }

    long start= System.currentTimeMillis();


    // from user query get table Name, WHERE column name and condition
    public String getTableName(String userQuery){
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
            Pattern patternTb = Pattern.compile("from(.*)where",Pattern.CASE_INSENSITIVE);
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

            //validate if where condition columns exist

        } else {
            tableName = queryString[queryString.length-1];
            if (tableName.contains(";")){
                tableName = tableName.substring(0, tableName.length()-1);
            }
        }
        return tableName;
    }


    // read txt file and store values in DS
    public void readFile(String userQuery){

        String tableName = getTableName(userQuery);

        // validate if table exists

        /*File folder = new File("./");
        File[] listOfFiles = folder.listFiles();

        ArrayList<String> tableFiles = new ArrayList<String>();

        for (int i = 0; i < listOfFiles.length; i++) {
            if (listOfFiles[i].isFile()) {
                tableFiles.add(listOfFiles[i].getName().split("_")[0]);
            }
        }
        if (!tableFiles.contains(tableName)){
            throw new TableNotFoundException("Error: table name does not exist");
        }*/


        // get column names
        Pattern pattern = Pattern.compile("select(.*)from",Pattern.CASE_INSENSITIVE);
        Matcher matcher = pattern.matcher(userQuery);
        String[] selectColumns = new String[0];

        while (matcher.find()) {
            selectColumns = matcher.group(1).split(",");
        }
        for (String name : selectColumns ){
            this.selectNames.add(name.trim());
        }


        int lineCounter = 0;
        // read table file
        try {
            File tableFile = new File(siteSelected +"/"+tableName + "_Values.txt");
            Scanner myReader = new Scanner(tableFile);

            while (myReader.hasNextLine()) {

                // read each line
                String data = myReader.nextLine();
                String[] colValues = data.split(";");

                // check if line is blank
                if (data.length() == 0){
                    break;
                }

                // get column names and store in a array list
                if (lineCounter == 0){
                    ArrayList<String> tempNames = new ArrayList<String>();
                    Collections.addAll(tempNames, colValues);

                    // get where condition column indexes
                    if (this.whereExists){
                        // get column index of where condition column
                        for (String whereCol : this.whereColumns.keySet()){
                            int whereColIndex = tempNames.indexOf(whereCol);
                            this.whereColumns.put(whereCol, whereColIndex);
                        }
                    }

                    // check if all columns need to be selected
                    if (this.selectNames.get(0).equals("*")) {
                        Collections.addAll(this.columnNames, colValues);

                        for (String selected : this.columnNames) {
                            int colIndex = tempNames.indexOf(selected);

                            // map selected column index to column names
                            this.columnIndex.put(selected, colIndex);
                        }
                    } else if (!tempNames.containsAll(this.selectNames)){
                        // validate if the selected columns exit in the table
                        System.out.println("ERROR: The columns don't exist in the specified table.");
                        System.exit(1);
                    } else {
                        // if all selected columns exist in table, add all to column names list
                        this.columnNames.addAll(this.selectNames);

                        // get selected columns indexes according to table file columns
                        for (String selected : this.selectNames){
                            int colIndex = tempNames.indexOf(selected);

                            // map selected column index to column names
                            this.columnIndex.put(selected, colIndex);
                        }
                    }

                    // add empty arraylists as values for keys of table hashmap
                    for (String colName : this.columnNames) {
                        ArrayList<Object> column = new ArrayList<Object>();
                        this.data_table.put(colName, column);

                        // add column value string length for each column name
                        this.colCharSize.put(colName, colName.length());
                    }

                } else {
                    if (whereExists){
                        boolean whereCondition = false;

                        for (String whereCol : this.whereColumns.keySet()){
                            int whereColIndex = this.whereColumns.get(whereCol);

                            if (this.columnConditions.get(whereCol).equals(colValues[whereColIndex])){
                                whereCondition = true;
                            }
                        }
                        if (whereCondition){
                            // add column values to each column array list
                            for (String columnName : this.columnNames) {
                                int colIndex = this.columnIndex.get(columnName);
                                String colValue = colValues[colIndex];

                                this.data_table.get(columnName).add(colValue);
                                // update column character lengths
                                if (colValue.length() > this.colCharSize.get(columnName)){
                                    this.colCharSize.put(columnName, colValue.length());
                                }
                            }
                        }
                    } else {
                        // add column values to each column array list
                        for (String columnName : this.columnNames) {
                            int colIndex = this.columnIndex.get(columnName);
                            String colValue = colValues[colIndex];

                            this.data_table.get(columnName).add(colValue);
                            // update column character lengths
                            if (colValue.length() > this.colCharSize.get(columnName)){
                                this.colCharSize.put(columnName, colValue.length());
                            }
                        }
                    }
                }
                lineCounter += 1;
            }
            myReader.close();

        } catch (Exception e) {
            logger.warn(e.getMessage());
            System.out.println("An error occurred.");
            e.printStackTrace();
            System.exit(1);
        }
    }

    // create dash lines for pretty printing
    private void printDash() {

        for (int i = 0; i < this.columnNames.size(); i++) {
            if (i == 0) {
                System.out.print("+");
            }
            // get column character length
            int charLength = this.colCharSize.get(this.columnNames.get(i)) + 2;

            for (int j = 0; j < charLength; j++) {
                System.out.print("-");
            }
            if (i == this.columnNames.size() - 1) {
                System.out.println("+");
            } else {
                System.out.print("+");
            }
        }
    }

    // print results to console
    public void printResult() {
        logger.info("selected rows are returned");

        int charLength = 0;

        printDash();
        // print column names or values
        for (int i = 0; i < this.columnNames.size(); i++) {
            if (i == 0) {
                System.out.print("|");
            }
            // get column character length
            charLength = this.colCharSize.get(this.columnNames.get(i)) + 2;

            System.out.print(String.format("%1$-" + charLength + "s", this.columnNames.get(i)));

            if (i == this.columnNames.size() - 1) {
                System.out.println("|");
            } else {
                System.out.print("|");
            }
        }
        printDash();
        // print column values
        for (int i = 0; i < this.data_table.get(this.columnNames.get(0)).size(); i++) {
            for (int j = 0; j < this.columnNames.size(); j++) {
                if (j == 0) {
                    System.out.print("|");
                }
                charLength = this.colCharSize.get(this.columnNames.get(j)) + 2;
                System.out.print(String.format("%1$-" + charLength + "s", this.data_table.get(columnNames.get(j)).get(i)));

                if (j == this.columnNames.size() - 1) {
                    System.out.println("|");
                } else {
                    System.out.print("|");
                }
            }
        }
        printDash();


        long end = System.currentTimeMillis();
        long executiontime = end-start;
        System.out.println("execution time in millis:"+executiontime);
        logger.info(("Execution time for select query is :"+executiontime +"  milliseconds"));
    }

}
