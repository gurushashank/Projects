package DatabaseOperations;

import org.apache.log4j.Logger;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class CreateTable {

    private HashMap<String, String> hashMap = new HashMap<String, String>();
    public String tableName;
    private String path1;
    private String path2;
    private List<String> constraintsList = new ArrayList<>();
    private String siteSelected = null;
    static Logger logger= Logger.getLogger(CreateTable.class);
    long start= System.currentTimeMillis();

    public CreateTable(String siteSelected) {
        this.siteSelected = siteSelected;
    }

    public boolean identifyIfTheQueryIsValid() {


        return false;
    }

    public void identifyTheColumnsInQuery(String userQuery) {

        String[] tableColumnsList = userQuery.split(",");
        // To find the table name and first column
        String[] tempList = tableColumnsList[0].split(" ");
        tableName = tempList[2];
        if(tableName.contains("(")) {
            String[] tableNameList = (tempList[2].split("\\("));
            tableName = tableNameList[0].trim();

        }
        // Find the column names along with their data types
        // Get the first column name and datatype
        // split at ( and then at space
        String[] temp2List = tableColumnsList[0].split("\\(");
        String column1 = temp2List[1].trim();
        String[] temp3List = column1.split(" ");
        StringBuilder temp3ListResultString = new StringBuilder();
        temp3ListResultString.append(temp3List[1]).append(" ");
        if(temp3List.length > 2) {
            // Starting from 2 as 0 will be key and array elements after 0 will be part of the
            int j = 2;
            while(j<temp3List.length) {
                temp3ListResultString.append(temp3List[j]).append(" ");
                j++;
            }
        }

        hashMap.put(temp3List[0], temp3ListResultString.toString());
        // Now add the other column names and data type to the hashmap
        // Create a list to add the constraints like primary key and foreign key
        for(int i=1;i<tableColumnsList.length;i++) {
            if(tableColumnsList[i].trim().split(" ")[0].equalsIgnoreCase("primary")) {
                // add all the constraints to the table columns list
                constraintsList.add(tableColumnsList[i].trim());
                continue;
            }
            else if(tableColumnsList[i].trim().split(" ")[0].equalsIgnoreCase("foreign")) {
                // add all the constraints to the table columns list
                constraintsList.add(tableColumnsList[i].trim());
                continue;
            }
            String[] temp4List = tableColumnsList[i].trim().split(" ");
            StringBuilder valueResultString = new StringBuilder();
            valueResultString.append(temp4List[1].trim()).append(" ");
            if(temp4List.length > 2) {
                // Starting from 1 as 0 will be key and array elements after 0 will be part of the
                int j = 2;
                while(j<temp4List.length) {
                    valueResultString.append(temp4List[j]).append(" ");
                    j++;
                }
            }
            hashMap.put(temp4List[0].trim(), valueResultString.toString());
        }
        // Print the hashmap
        for(Map.Entry<String,String> entry: hashMap.entrySet()) {
            System.out.println("Key = " + entry.getKey() + " ,Value is: " + entry.getValue());
        }
    }

    public void createAFileToStoreDatatypeOfTableAttributes() {

        try {
            File file = new File(siteSelected + "\\"+tableName + "_Datatype.txt");
            if(file.createNewFile()) {
                    // add a logger here to say that the file is created
                System.out.println("File Created:" + file.getName());
            }
            else {
                System.out.println("File already exists");
            }
            BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter(file, false));
            // To create one file where we store the data types
            for(Map.Entry<String,String> entry: hashMap.entrySet()) {
                bufferedWriter.write(entry.getKey() + "," + entry.getValue() + ";");
            }
            for(int i=0; i<constraintsList.size();i++) {
                bufferedWriter.write(constraintsList.get(i) + ";");
            }
            bufferedWriter.close();
        }catch (IOException e) {
            System.out.println(e.getMessage());
        }
    }

    public void createAFileToStoreTableData() {

        try {
            File file = new File(siteSelected + "\\" + tableName + "_Values.txt");
            if(file.createNewFile()) {
                System.out.println("File Created:" + file.getName());
            }
            else {
                System.out.println("File already exists");
            }
            BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter(file, false));
            // To create one file where we store the data types
            for(Map.Entry<String,String> entry: hashMap.entrySet()) {
                bufferedWriter.write(entry.getKey() + ";");
            }
            bufferedWriter.close();
        }catch (IOException e) {
            System.out.println(e.getMessage());
        }
        long end=System.currentTimeMillis();
        long executionTime=end-start;
        System.out.println("execution time in millis:"+executionTime);
        logger.info("Create Table created for "+ siteSelected);
        logger.info(("Execution time for Create Query is :"+executionTime +"  milliseconds"));
    }
}
