package DatabaseOperations;

import Parser.ParseQuery;
import org.apache.log4j.Logger;

import java.util.Scanner;

public class SqlQuery {

    private String siteSelected = null;
    static Logger logger= Logger.getLogger(ErDiagram.class);

    public SqlQuery(String siteSelected) {
        this.siteSelected = siteSelected;
    }

    // Method to Create a table
    public void createTable(String userQuery) {

        logger.info("Create table");
        CreateTable createTable = new CreateTable(siteSelected);
        createTable.identifyTheColumnsInQuery(userQuery);
        createTable.createAFileToStoreDatatypeOfTableAttributes();
        createTable.createAFileToStoreTableData();

        // add table to local data dictionary
        String tableName = createTable.tableName;
        LocalDictionary localdatadic = new LocalDictionary();
        localdatadic.localCreate(siteSelected, tableName);
    }

    // Method to insert values into the database
    public void insertIntoDatabase(String userQuery) {
        logger.info("Insert into Table");
        InsertIntoTable insert=new InsertIntoTable(siteSelected);
        insert.identifyTheValuesInQuery(userQuery);
        insert.SaveToFile();
    }

    // Method for select query
    public void selectQuery(String userQuery) {
        System.out.println("Select from Table");
        logger.info("Select from Table");
        SelectQuery selectQuery = new SelectQuery(siteSelected);
        selectQuery.readFile(userQuery);
        selectQuery.printResult();
    }

    // Method for delete query
    public void deleteQuery(String userQuery) {
        System.out.println("Delete from Table");
        logger.info("Delete from Table");
        DeleteQuery deleteQuery = new DeleteQuery(siteSelected);
        deleteQuery.deleteRecord(userQuery);
    }

    // Method for update query
    public void updateQuery(String userQuery){
        System.out.println("update table");
        logger.info("update table");
        UpdateQuery updateQuery = new UpdateQuery(siteSelected);
        updateQuery.updateRecord(userQuery);
    }

    // Method for transaction query
    public void transactionQuery(String userQuery){
        System.out.println("performing transaction");
        logger.info("performing transaction");
        Transaction transaction = new Transaction(siteSelected);
        transaction.parseQuery(userQuery);
    }

    // Method to perform sql operations
    public void performCrudOperations() {
        String crudOperation;
        String userQuery = null;

        /// Take the input from the user and parse it and then call
        // the particular crud operation
        do {
            Scanner userInput = new Scanner(System.in);
            userQuery = userInput.nextLine();

            // Call the parser module to check which CRUD operation to perform
            crudOperation = ParseQuery.parseToIdentifySqlOperation(userQuery);
        }while(crudOperation == null);

        if(crudOperation.equals("create")) {
            createTable(userQuery);
        }
        else if(crudOperation.equals("insert")) {
            insertIntoDatabase(userQuery);
        }
        else if(crudOperation.equals("select")) {
            selectQuery(userQuery);
        }
        else if(crudOperation.equals("delete")) {
            deleteQuery(userQuery);
        }
        else if (crudOperation.equals("update")){
            updateQuery(userQuery);
        }
        else if (crudOperation.equals("transaction")){
            transactionQuery(userQuery);
        }
        else {
            System.out.println("Not a valid crud operation");
        }
    }
}
