package User;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import Encryption.Transposition;

public class UserLogin {

    private String adminName;
    private String adminPassword;
    private List<String> usernameList = new ArrayList<>();
    private List<String> passwordList = new ArrayList<>();
    // Key for the transposition cipher
    private int[] key = {3,4,2,1,5};
    private Transposition transpositionMatrix = new Transposition();

    public UserLogin() {

        try {
            BufferedReader bufferedReader = new BufferedReader(new FileReader("src/User/credentials.txt"));
            String line = null;
            while((line= bufferedReader.readLine())!=null) {
                String[] tempList = line.split(":");
                usernameList.add(tempList[0].trim());
                passwordList.add(tempList[1].trim());
            }
        }
        catch (IOException e) {
            System.out.println(e.getMessage());
        }
    }

    public boolean loginForUser() {

        Scanner userInput = new Scanner(System.in);
        System.out.println("Hello User, Please enter your credentials");
        int count = 1;
        String adminPassword1;
        do{
            System.out.println("Enter your username:");
            adminName = (userInput.next());

            System.out.println("Enter your password:");
            adminPassword = (userInput.next());
            // the password list has the encrypted passwords so we encrypt the input password and then match. This approach
            // is used to keep the actual password to not be seen while running or debugging.
            adminPassword1 = transpositionMatrix.generateCipherText(adminPassword, key);

            if(adminName.equals(usernameList.get(0)) && adminPassword1.equals(passwordList.get(0)) ||
               adminName.equals(usernameList.get(1)) && adminPassword1.equals(passwordList.get(1))) {
                return true;
            }
            System.out.println("Invalid Credentials.");
            count++;
        }while(!(adminName.equals(usernameList.get(0)) && adminPassword1.equals(passwordList.get(0)) ||
                 adminName.equals(usernameList.get(1)) && adminPassword1.equals(passwordList.get(1))) && count < 4 );

        System.out.println("Credentials were invalid for three consecutive times. ");
        return false;
    }

    public static void main(String[] args) {

        UserLogin userLogin = new UserLogin();
        userLogin.loginForUser();
    }
}
