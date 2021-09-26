package Parser;

import org.apache.log4j.Logger;

import java.util.regex.Pattern;

public class ParseQuery {

    static Logger logger= Logger.getLogger(ParseQuery.class);

    public static String parseToIdentifySqlOperation(String userQuery) {

        if(userQuery == null) {
            return null;
        }

        // Initializing regex variables
        String regexQueryCreate = "(create).(table).([a-zA-Z_]+)(.?)\\(.*";
        String regexQueryInsert = "(insert)\\s(into)\\s(\\w+)(\\s?)\\(.*";
        String regexQuerySelect = "(select)\\s(\\*?)(\\w*).*";
        String regexQueryDelete = "(delete)\\s(from)\\s(\\w*).*";
        String regexQueryUpdate = "(update).*(set).*(where).*";
        String regexTransaction = "(start)\\s(transaction).*(commit;)";

        boolean invalidSqlQuery = false;

        // Matching regex query with the user query to find out which Sql Operation it is
        boolean isItMatchingForCreate = Pattern.compile(regexQueryCreate, Pattern.CASE_INSENSITIVE).matcher(userQuery).matches();
        boolean isItMatchingForInsert = Pattern.compile(regexQueryInsert, Pattern.CASE_INSENSITIVE).matcher(userQuery).matches();
        boolean isItMatchingForSelect = Pattern.compile(regexQuerySelect, Pattern.CASE_INSENSITIVE).matcher(userQuery).matches();
        boolean isItMatchingForDelete = Pattern.compile(regexQueryDelete, Pattern.CASE_INSENSITIVE).matcher(userQuery).matches();
        boolean isItMatchingForUpdate = Pattern.compile(regexQueryUpdate, Pattern.CASE_INSENSITIVE).matcher(userQuery).matches();
        boolean matchTransaction = Pattern.compile(regexTransaction, Pattern.CASE_INSENSITIVE).matcher(userQuery).matches();

        // Return create, insert, select, update, delete depending on the regex parsing output
        if(isItMatchingForCreate) {
            logger.info("Regex matched for Create.");
            return "create";
        }
        else if(isItMatchingForInsert) {
            logger.info("Regex matched for Create.");
            return "insert";
        }
        else if(isItMatchingForSelect) {
            logger.info("Regex matched for Create.");
            return "select";
        }
        else if(isItMatchingForDelete) {
            logger.info("Regex matched for Create.");
            return "delete";
        }
        else if(isItMatchingForUpdate) {
            logger.info("Regex matched for Create.");
            return "update";
        }
        else if(matchTransaction) {
            return "transaction";
        }
        else {
            logger.info("Invalid Sql Query.");
            System.out.println("Invalid Sql Query.");
            return null;
        }
    }
}
