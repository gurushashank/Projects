package Console;

import java.util.Scanner;

import DatabaseOperations.SqlDumpFile;
import DatabaseOperations.ErDiagram;
import DatabaseOperations.SqlQuery;
import User.UserLogin;
import org.apache.log4j.Logger;

public class ConsoleRunner {

    static Logger logger= Logger.getLogger(ConsoleRunner.class);

    public static void main(String[] args) {

        String quitCommand = "quit";
        String userCommand;
        boolean isLoginSuccessful = false;
        Scanner inputCommand = new Scanner(System.in);
        UserLogin userLogin = new UserLogin();

        // The Console Interface for the database
        System.out.println("Welcome to Onyx Command Line Database");
        logger.info("Welcome to Onyx Command Line Database");
        System.out.println("1. To login ");
        logger.info("1. To login ");
        System.out.println("Press any key. To exit the application");
        logger.info("Press any key. To exit the application ");
        System.out.println("Choose 1 or press any key");
        logger.info("Choose 1 or press any key ");
        userCommand = inputCommand.next();
        if(userCommand.equals("1")) {
            isLoginSuccessful = userLogin.loginForUser();
            logger.info("Login Successful ");

            do {
                System.out.println("Welcome User");
                // If login is successful, then do the sql operations
                // Connect to site 1 or site 2
                System.out.println("Connect to Site 1 or Site 2 - Enter 1 or 2");
                userCommand = inputCommand.next();
                String siteSelection = userCommand;
                if(siteSelection.equalsIgnoreCase("1")) {
                    logger.info("Site selected: "+ siteSelection);
                    siteSelection = "OnyxDbSite1";
                }
                else if(siteSelection.equalsIgnoreCase("2")) {
                    logger.info("Site selected: "+ siteSelection);
                    siteSelection = "OnyxDbSite2";
                }
                else {
                    logger.info("Invalid Input, Please enter a valid input: 1 or 2 ");
                    System.out.println("Invalid Input, Please enter a valid input: 1 or 2");
                    continue;
                }

                System.out.println("Please enter the operation you would like to perform");
                logger.info("Please enter the operation you would like to perform");
                System.out.println("1. Enter a SQL Query");
                logger.info("1. Enter a SQL Query");
                System.out.println("2. Create a SQL Dump File");
                logger.info("2. Create a SQL Dump File");
                System.out.println("3. Create an ER Diagram");
                logger.info("3. Create an ER Diagram");
                System.out.println("quit. Quit the Database");
                logger.info("quit. Quit the Database");
                System.out.println("*******************************************************");
                logger.info("*******************************************************");
                userCommand = inputCommand.next();

                if (userCommand.equalsIgnoreCase("1")) {
                    logger.info("CRUD Operations");
                    System.out.println("Enter a Sql Query");
                    // Operations on sql query create, insert, select, delete
                    SqlQuery query = new SqlQuery(siteSelection);
                    query.performCrudOperations();
                } else if (userCommand.equalsIgnoreCase("2")) {
                    // Create a SQL dump file
                    logger.info("SQL Dump File");
                    Scanner sc=new Scanner(System.in);
                    System.out.println("Please enter the table name :  ");
                    String tableName=sc.nextLine();
                    SqlDumpFile dumpFile=new SqlDumpFile(siteSelection,tableName);
                    dumpFile.fetchFieldValues();
                    
                } else if (userCommand.equalsIgnoreCase("3")) {
                    // Create an ER Diagram
                    logger.info("ER Diagram");
                    ErDiagram erDiagram= new ErDiagram(siteSelection);
                    erDiagram.loadAllTablesFromSiteLocation();
                    erDiagram.buildListOfErNodes();
                    erDiagram.printErTable();

                } else if (userCommand.equalsIgnoreCase("quit")) {
                    logger.info("Exiting the application");
                    System.out.println("Exiting the application.");
                    break;
                } else {
                    logger.info("Bad Command, Please enter a command again.");
                    System.out.println("Bad Command, Please enter a command again.");
                }
            } while (isLoginSuccessful);
        }
        else {
            logger.info("Exiting the application");
            System.out.println("Exiting the application");
        }
    }
}
