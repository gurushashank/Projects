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


public class DeleteQuery {

    // logger for select query
    static Logger logger= Logger.getLogger(DeleteQuery.class);

    private String siteSelected = null;
    long start= System.currentTimeMillis();


    public DeleteQuery(String siteSelected) {
        this.siteSelected = siteSelected;
    }

    public void deleteRecord(String userQuery) {
        SelectQuery selectQuery = new SelectQuery(siteSelected);
        String tableName = selectQuery.getTableName(userQuery);

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

                    if (!selectQuery.whereExists){
                        break;
                    }

                    // get column index of where condition column
                    ArrayList<String> tempNames = new ArrayList<String>();
                    Collections.addAll(tempNames, colValues);
                    for (String whereCol : selectQuery.whereColumns.keySet()){
                        int whereColIndex = tempNames.indexOf(whereCol);
                        selectQuery.whereColumns.put(whereCol, whereColIndex);
                    }

                } else {

                    boolean whereCondition = false;

                    for (String whereCol : selectQuery.whereColumns.keySet()){
                        int whereColIndex = selectQuery.whereColumns.get(whereCol);

                        if (selectQuery.columnConditions.get(whereCol).equals(colValues[whereColIndex])){
                            whereCondition = true;
                        }
                    }

                    if (!whereCondition){
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
        }


        long end = System.currentTimeMillis();
        long executiontime = end-start;
        System.out.println("execution time in millis:"+executiontime);
        logger.info(("Execution time for delete query is :"+executiontime +"  milliseconds"));
    }

}
