package com.wayne.project;

import java.util.Scanner;

/* Console runner to run the Wayne banking application */
public class ConsoleRunnerAdmin {

	// Initializing variables 
	private static String commandEntered;
	private static Scanner userInput = new Scanner(System.in);
	private static String quitCommand = "quit";
	private static String adminUsername;
	private static String adminPassword;
	
	/* Getter and Setter methods for the above variables */
	private static String getAdminUsername() {
		return adminUsername;
	}

	private static void setAdminUsername(String adminUsername) {
		ConsoleRunnerAdmin.adminUsername = adminUsername;
	}

	private static String getAdminPassword() {
		return adminPassword;
	}

	private static void setAdminPassword(String adminPassword) {
		ConsoleRunnerAdmin.adminPassword = adminPassword;
	}

	// Method to run via Console 
	public static void run() {
		
		System.out.println("Welcome to Wayne Banking Corporation");
		System.out.println("1. To login ");
		System.out.println("quit. To exit the application");
		System.out.println("Choose 1 or quit");

		
		// Continue the while loop till the user types 'quit'
		do {
						
			// First call the login function and login as customer or administrator
			commandEntered = userInput.next();
			
			if(commandEntered.equalsIgnoreCase("1")) {
				
				if(loginForAdmin(userInput)) {

					System.out.println("Welcome Admin, Login was successful.");
					// now display all the options for the admin here
					
					System.out.println("What would like to do?");
					System.out.println("1.Create Customer Login Information");
					System.out.println("2.Approve loans");
					System.out.println("3. Close the account");
					System.out.println("4. Unlock the account");
					System.out.println("quit to Exit the application");
					
					commandEntered = userInput.next();
					if(commandEntered.equalsIgnoreCase("1")) {
						// Call to create login information
					}
					else if(commandEntered.equalsIgnoreCase("1")) {
						// Call approve loans
					}
					else if(commandEntered.equalsIgnoreCase("2")) {
						// Close the account
					}
					else if(commandEntered.equalsIgnoreCase("3")) {
						// Unlock the account
					}
					else if(commandEntered.equalsIgnoreCase("quit")) {
						break;
					}
				}
			}
			
		}while(!commandEntered.equalsIgnoreCase(quitCommand));
	}
	
	// Login for Bank Administrators
	public static boolean loginForAdmin(Scanner userInput) {
		
		System.out.println("Hello Administrator, Please enter your credentials");
		System.out.println("Enter your username:");
		setAdminUsername(userInput.next());
		
		System.out.println("Enter your password:");
		setAdminPassword(userInput.next());
		
		// verify Username and password and send true if credentials are valid
		return false;
	}
}
