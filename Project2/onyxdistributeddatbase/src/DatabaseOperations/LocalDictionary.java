package DatabaseOperations;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Scanner;

public class LocalDictionary {

    // method for extracting and writing table information



    public void localCreate(String siteSelected, String tableName){

        // get all file names of the selected site
        File folder = new File("./"+siteSelected+"/");
        File[] listOfFiles = folder.listFiles();
        ArrayList<String> allFiles = new ArrayList<String>();
        for (int i = 0; i < listOfFiles.length; i++) {
            if (listOfFiles[i].isFile()) {
                allFiles.add(listOfFiles[i].getName());
            }
        }

        // iterate over the site location files
        for (String file : allFiles){

            String[] filePlus = file.split("_");
            if (filePlus.length > 1){
                if ((filePlus[0].equals(tableName)) && (filePlus[1].equals("Datatype.txt"))){

                    if (allFiles.contains(siteSelected+"_LocalDictionary")){

                        try {
                            FileWriter localTemp = new FileWriter("temp.txt");

                            File dataFile = new File("./"+siteSelected+"/"+siteSelected+"_LocalDictionary");
                            Scanner myReader = new Scanner(dataFile);

                            int lineTracker = 0;
                            while (myReader.hasNextLine()) {
                                String data = myReader.nextLine();
                                localTemp.write(data);
                                localTemp.write("\n");
                            }

                            // write table information
                            localTemp.write("\t");
                            localTemp.write("Table_Name: ");
                            localTemp.write(tableName);
                            localTemp.write("\n");

                            // write number of records in the table which will be updated by insert or delete
                            localTemp.write("\t\t");
                            localTemp.write("Number_of_Records: ");
                            localTemp.write("null");
                            localTemp.write("\n");

                            try {
                                File dataTemp = new File("./"+siteSelected+"/"+tableName+"_"+"Datatype.txt");
                                Scanner myReader1 = new Scanner(dataTemp);

                                while (myReader1.hasNextLine()) {
                                    String data = myReader1.nextLine();

                                    String[] tempData = data.split(";");

                                    for (String indData : tempData){

                                        String[] oneData = indData.split(",");

                                        // if it's column data add to data dictionary file
                                        if (oneData.length > 1){
                                            String columnName = oneData[0];
                                            String columnType = oneData[1].split(" ")[0];

                                            // add column name
                                            localTemp.write("\t\t");
                                            localTemp.write("Column_Name: ");
                                            localTemp.write(columnName);
                                            localTemp.write("\n");

                                            // write column data type
                                            localTemp.write("\t\t\t");
                                            localTemp.write("Data_Type: ");
                                            localTemp.write(columnType);
                                            localTemp.write("\n");
                                        } else {
                                            localTemp.write("\t\t");
                                            localTemp.write(indData);
                                            localTemp.write("\n");
                                        }
                                    }
                                }
                                myReader1.close();
                            } catch (Exception e) {
                                System.out.println("An error occurred.");
                                e.printStackTrace();
                            }


                            // close and delete opened table file
                            myReader.close();
                            dataFile.delete();

                            // rename from temp to table file name and write new table file
                            localTemp.close();
                            File oldFile = new File("temp.txt");
                            File newFile = new File("./"+siteSelected+"/"+siteSelected+"_LocalDictionary");
                            oldFile.renameTo(newFile);


                        } catch (Exception e) {
                            System.out.println("An error occurred.");
                            e.printStackTrace();
                        }

                    } else {

                        try {
                            FileWriter localTemp = new FileWriter("./"+siteSelected+"/"+siteSelected+"_LocalDictionary");

                            // write new table into local data dictionary
                            // write site name
                            localTemp.write("Site_Name: ");
                            localTemp.write(siteSelected);
                            localTemp.write("\n");

                            // write table information
                            localTemp.write("\t");
                            localTemp.write("Table_Name: ");
                            localTemp.write(tableName);
                            localTemp.write("\n");

                            // write number of records in the table which will be updated by insert or delete
                            localTemp.write("\t\t");
                            localTemp.write("Number_of_Records: ");
                            localTemp.write("null");
                            localTemp.write("\n");

                            try {
                                File dataTemp = new File("./"+siteSelected+"/"+tableName+"_"+"Datatype.txt");
                                Scanner myReader = new Scanner(dataTemp);

                                int lineTracker = 0;
                                while (myReader.hasNextLine()) {
                                    String data = myReader.nextLine();

                                    String[] tempData = data.split(";");

                                    for (String indData : tempData){

                                        String[] oneData = indData.split(",");

                                        // if it's column data add to data dictionary file
                                        if (oneData.length > 1){
                                            String columnName = oneData[0];
                                            String columnType = oneData[1].split(" ")[0];

                                            // add column name
                                            localTemp.write("\t\t");
                                            localTemp.write("Column_Name: ");
                                            localTemp.write(columnName);
                                            localTemp.write("\n");

                                            // write column data type
                                            localTemp.write("\t\t\t");
                                            localTemp.write("Data_Type: ");
                                            localTemp.write(columnType);
                                            localTemp.write("\n");
                                        } else {
                                            localTemp.write("\t\t");
                                            localTemp.write(indData);
                                            localTemp.write("\n");
                                        }
                                    }
                                }
                                myReader.close();
                            } catch (Exception e) {
                                System.out.println("An error occurred.");
                                e.printStackTrace();
                            }


                            // read table data type to get column information




                            localTemp.close();
                        } catch (Exception e) {
                            System.out.println("An error occurred.");
                            e.printStackTrace();
                        }
                    }
                }
            }
        }
    }


}
