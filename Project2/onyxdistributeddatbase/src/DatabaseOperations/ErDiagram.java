package DatabaseOperations;

import org.apache.log4j.Logger;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

public class ErDiagram {

    private String siteSelected;
    private String[] listOfTableNames;
    private List<TableNode> collectionOfTables = new ArrayList<TableNode>();
    static Logger logger= Logger.getLogger(ErDiagram.class);
    long start= System.currentTimeMillis();

    public ErDiagram(String siteSelected) {

        this.siteSelected = siteSelected;
    }

    // https://www.geeksforgeeks.org/file-class-in-java/
    public void loadAllTablesFromSiteLocation() {

        // Read all the tables
        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(System.in));
        // the directory path will be the siteSelection variable
        File directory = new File(siteSelected + "//");
        if(directory.exists()) {
            // push all the contents of the directory (files) to an array
            listOfTableNames = directory.list();
            for (int i = 0; i < listOfTableNames.length ; i++) {
                logger.info(listOfTableNames[i]);
            }
            logger.info("No of entries in this directory "+listOfTableNames.length);
        }
        else {
            logger.info("Directory not found");
        }
    }

    public void buildListOfErNodes() {

        logger.info("Building list of ER Nodes");
        for(int i=0;i<listOfTableNames.length;i++) {
            String[] tempList1 = listOfTableNames[i].split("_");
            if(tempList1[tempList1.length-1].equalsIgnoreCase("Datatype.txt")) {
                // if true, then read the file
                // in the file look for primary key and foreign key
                TableNode tableNode = new TableNode();
                try {
                    BufferedReader bufferedReader = new BufferedReader(new FileReader(siteSelected + "//" +listOfTableNames[i]));
                    String line;
                    while( (line = bufferedReader.readLine()) != null) {
                        // now split the file along semicolon
                        String[] tempList3 = line.split(";");
                        String tableName = listOfTableNames[i];
                        tableNode.setTableName(tableName);
                        for(int j=0;j<tempList3.length;j++) {
                            if(tempList3[j].toLowerCase().contains("primary")) {
                                int index = tempList3[j].toLowerCase().indexOf("key") + 4;
                                // take the above index to find the name of the primary key
                                String primaryKey = tempList3[j].substring(index);
                                if(primaryKey.contains("(") && primaryKey.contains(")")) {
                                    String primaryKeyWithoutBrackets = primaryKey.substring(1,primaryKey.length() - 1);
                                    tableNode.setPrimaryKey(primaryKeyWithoutBrackets);
                                }
                                else {
                                    tableNode.setPrimaryKey(primaryKey);
                                }
                            }
                            if(tempList3[j].toLowerCase().contains("foreign")) {
                                int index = tempList3[j].toLowerCase().indexOf("key") + 4;
                                // take the above index to find the name of the primary key
                                String foreignKeyStringWithReferencesColumn = tempList3[j].substring(index);
                                int indexOfForeignKeyString = foreignKeyStringWithReferencesColumn.toLowerCase().indexOf("references");
                                String foreignKey = foreignKeyStringWithReferencesColumn.substring(0, (indexOfForeignKeyString - 1));
                                if(foreignKey.contains("(") && foreignKey.contains(")")) {
                                    String foreignKeyWithoutBrackets = foreignKey.substring(1, foreignKey.length() - 1);
                                    tableNode.setForeignKey(foreignKeyWithoutBrackets);
                                }else {
                                    tableNode.setForeignKey(foreignKey);
                                }
                            }
                        }
                    }
                }
                catch (IOException e) {
                    System.out.println(e.getMessage());
                }
                // load the primary key and foreign key to er nodes along with table names
                collectionOfTables.add(tableNode);
            }
        }
    }

    public void printErTable() {
        logger.info("ER Diagram: Displays the tables that are related.");
        System.out.println("ER Diagram: Displays the ER Relationship if the tables are related by Primary and Foreign key.");
        for(int i=0;i<collectionOfTables.size();i++) {
            for(int j=0;j<collectionOfTables.size();j++) {
                if(i==j) {
                    continue;
                }
                if(collectionOfTables.get(i).getPrimaryKey().equalsIgnoreCase(collectionOfTables.get(j).getForeignKey())) {
                    int index1 = collectionOfTables.get(i).getTableName().indexOf("_Datatype");
                    int index2 = collectionOfTables.get(j).getTableName().indexOf("_Datatype");
                    String temp1 = collectionOfTables.get(i).getTableName().substring(0, index1);
                    String temp2 = collectionOfTables.get(j).getTableName().substring(0, index2);
                    System.out.println(temp1+ " >>>> " + temp2);
                }
            }
        }
        long end=System.currentTimeMillis();
        long executionTime=end-start;
        System.out.println("execution time in millis:"+executionTime);
        logger.info("ER Diagram created for "+ siteSelected);
        logger.info(("Execution time for ER Diagram is :"+executionTime +"  milliseconds"));
    }
}
