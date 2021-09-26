package DatabaseOperations;

import org.apache.log4j.Logger;
import DatabaseOperations.DataValidation;

import java.io.*;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;


public class InsertIntoTable {
    private HashMap<String, String> hashMap = new HashMap<String, String>();
    static Logger logger= Logger.getLogger(InsertIntoTable.class);
    private String tableName;
    private String[] keys;
    private String[] values;
    private String mockvalues;
    private String[] Primarykey;
    private String[] firstvalue;
    private String strLine1;
    private String siteSelected = null;
    long start= System.currentTimeMillis();



    public InsertIntoTable(String siteSelected)
    {
        this.siteSelected=siteSelected;
    }




    public void identifyTheValuesInQuery(String userQuery) {

        String[] tableColumnsList = userQuery.split(",");
        String[] tempList = tableColumnsList[0].split(" ");
        //System.out.println(Arrays.toString(tempList));
        tableName = tempList[2];
        //System.out.println(tableName);
        if (tableName.contains("(")) {
            String[] tableNameList = (tempList[2].split("\\("));
            //System.out.println(Arrays.toString(tableNameList));
            tableName = tableNameList[0].trim();
            System.out.println("table name : " +tableName);
            }
        String data = null;
        try {
            File myObj = new File(siteSelected + "\\" + tableName + "_Values.txt");
            Scanner myReader = new Scanner(myObj);
            for (int i = 0; i < 1; i++) {
                data = myReader.nextLine();
                //System.out.println(data);
            }
            myReader.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }


        //System.out.println(Arrays.toString(tableColumnsList));
        String[] tableColumnsList1 = userQuery.split(".*(?=values)");
        System.out.println(Arrays.toString(tableColumnsList1));
        String a = tableColumnsList1[2];
        String[] words = a.split("\\(");
        //System.out.println(Arrays.toString(words));
        for (int i = 1; i < words.length; i++) {
            mockvalues = words[i];
            mockvalues = mockvalues.replaceAll("[)]", "");
            mockvalues = mockvalues.replaceAll("[;]", "");
            //System.out.println(mockvalues);
            String[] values = mockvalues.split(",");
            //System.out.println(Arrays.toString(values));

        }
        keys = data.split(";");
        //System.out.println(Arrays.toString(keys));

        values = mockvalues.split(",");
        //System.out.println(Arrays.toString(values));


        // for every key, value
        for (int i = 0; i < keys.length; i++) {

            // add them into the HashMap by calling the
            // put() method on the key-value pair
            hashMap.put(keys[i], values[i]);
        }

        for (Map.Entry<String, String> entry : hashMap.entrySet()) {
            System.out.println("Key = " + entry.getKey() + " ,Value is: " + entry.getValue());
        }

    }

    public void SaveToFile() {
        try {

            File myObj = new File(siteSelected + "\\" + tableName + "_Values.txt");
            Scanner myReader = new Scanner(myObj);
            firstvalue = mockvalues.split(",");
            System.out.println("Primary key value:" + firstvalue[0]);
            while ((strLine1 = myReader.nextLine()) != null) {
            
                Primarykey = strLine1.split(";");
                //System.out.println("Primary key comparision : " + Arrays.toString(Primarykey));
                for (int i = 0; i < Primarykey.length; i++) {
                    if (firstvalue[0].equals(Primarykey[i])) {
                        System.out.println("oops! primary key already exists");
                        System.out.println("Enter a valid primary key");
                        System.exit(1);

                    } else continue;
                }
            }
            myReader.close();
        } catch (Exception e) {
            //logger.info(e.getMessage());
            System.out.println(e);
        }

        try {
            logger.info("inserting to the file" + Arrays.toString(values));
            BufferedWriter outputWriter = null;
            outputWriter = new BufferedWriter(new FileWriter(siteSelected + "\\" + tableName + "_Values.txt",true));
            outputWriter.newLine();
            System.out.println(Arrays.toString(values));
            for (int i = 0; i < values.length; i++) {
                outputWriter.write(values[i] + ";");
            }

            outputWriter.flush();
            outputWriter.close();

        } catch (Exception e) {
            System.out.println(e);

        }
        long end=System.currentTimeMillis();
        long executiontime=end-start;
        System.out.println("execution time in millis:"+executiontime);
        logger.info(("Execution time for dump creation is :"+executiontime +"  milliseconds"));


    }

}
