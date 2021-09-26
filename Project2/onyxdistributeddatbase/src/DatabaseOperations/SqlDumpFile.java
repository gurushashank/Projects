package DatabaseOperations;

import java.io.*;
import java.util.Arrays;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import java.util.Scanner;

public class SqlDumpFile {
    private String siteSelection;
    private String tableName = null;
    String data = null;
    static Logger logger = Logger.getLogger(SqlDumpFile.class);
    long start = System.currentTimeMillis();


    public SqlDumpFile(String siteSelected, String tableName) {
        this.siteSelection = siteSelected;
        this.tableName = tableName;
    }

    public void fetchFieldValues() {
        try {
            File myObj = new File(siteSelection + "\\" + tableName + "_Datatype.txt");
            boolean exists = myObj.exists();
            if (exists == false) {
                logger.error("This table does not exist in specified path " + tableName);
                System.out.println("This table does not exist in specified path " + tableName);
                System.exit(1);
            }
            Scanner myReader = new Scanner(myObj);
            for (int i = 0; i < 1; i++) {
                System.out.println("Create Table "+tableName + "  (");
                data = myReader.nextLine();
                String mydata = data.replace(",", " ");
                String[] mydb = mydata.split(";");

                //System.out.println(Arrays.toString(mydb));
                String s1 = null;
                for (int j = 0; j < mydb.length - 1; j++) {
                    s1 = mydb[j];
                    System.out.println(mydb[j] + ",");

                }
                String s2 = null;
                for (int k = 0; k < mydb.length; k++) {
                    s2 = mydb[k];
                }
                String diff = StringUtils.difference(s1, s2);
                System.out.println(diff);
                System.out.println(");");

            }
            myReader.close();

        } catch (FileNotFoundException e) {
            e.printStackTrace();
            System.out.println("There is no file with the table name you mention in the database.");
        }
        long end = System.currentTimeMillis();
        long executiontime = end - start;
        System.out.println("execution time in millis:" + executiontime);
        logger.info("sql dump creation for " + tableName + " in " + siteSelection);
        logger.info(("Execution time for dump creation is :" + executiontime + "  milliseconds"));

    }
}