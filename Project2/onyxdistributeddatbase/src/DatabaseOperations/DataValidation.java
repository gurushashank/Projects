package DatabaseOperations;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.HashMap;
import java.util.Scanner;

public class DataValidation {

    // hashmap to store column names and data types
    HashMap<String, String> columnTypes = new HashMap<String, String>();


    // read data type file and save mapping to a hashmap
    public void readDatatype(String tableName) {
        try {
            // ope data type file for the required table
            File tableFile = new File(tableName + "_Datatype.txt");
            Scanner myReader = new Scanner(tableFile);

            int lineCounter = 0;
            while (myReader.hasNextLine()) {
                // read each line
                String data = myReader.nextLine();
                // check if line is blank
                if (data.length() == 0) {
                    break;
                }

                String[] typeElements = data.split(";");

                // iterate over all the column Name and corresponding data attributes
                for (int i = 0; i < typeElements.length-2; i++){
                    String ele = typeElements[i];
                    String[] colTypes = ele.split(",");
                    String[] typePlus = colTypes[1].split(" ");
                    String[] withBracket = typePlus[0].split("\\(");

                    // get column name and it's data type
                    String colName = colTypes[0];
                    String dataType = withBracket[0];

                    // store column name and data type to a hashmap
                    this.columnTypes.put(colName, dataType);

                }

                lineCounter += 1;
            }
            myReader.close();
        } catch (FileNotFoundException e) {
            System.out.println("An error occurred.");
            e.printStackTrace();
        }
    }

    // validate if input data satisfies column data type
    public void validate(String columnName, String insertValue){

        // get column data type
        String dataType = this.columnTypes.get(columnName);

        // validate if data is of Integer type
        if (dataType.equals("int")){
            try{
                Integer.parseInt(insertValue);
            } catch (NumberFormatException nfe){
                System.out.println(insertValue);
                System.out.println("invalid data type. Requires INT type");
                System.exit(1);
            }
        }

        // validate if data is of Decimal type
        if (dataType.equals("decimal")){
            try{
                Double.parseDouble(insertValue);
            } catch (NumberFormatException nfe){
                System.out.println(insertValue);
                System.out.println("invalid data type. Requires DECIMAL type");
                System.exit(1);
            }
        }
    }

}