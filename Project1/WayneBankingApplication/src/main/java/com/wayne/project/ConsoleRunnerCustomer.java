package com.wayne.project;

import java.util.Scanner;

/* Console runner to run the Wayne banking application */
public class ConsoleRunnerCustomer {

	// Initializing variables 
	private static String commandEntered;
	private static Scanner userInput = new Scanner(System.in);
	private static String quitCommand = "quit";
	private static String customerUsername;
	private static String customerPassword;
	private static String forgotPassword;
	
	/* Getter and Setter methods for the above variables */

	public static String getCustomerUsername() {
		return customerUsername;
	}

	public static void setCustomerUsername(String customerUsername) {
		ConsoleRunnerCustomer.customerUsername = customerUsername;
	}


	public static String getCustomerPassword() {
		return customerPassword;
	}


	public static void setCustomerPassword(String customerPassword) {
		ConsoleRunnerCustomer.customerPassword = customerPassword;
	}

	public static String getForgotPassword() {
		return forgotPassword;
	}


	public static void setForgotPassword(String forgotPassword) {
		ConsoleRunnerCustomer.forgotPassword = forgotPassword;
	}

	// Method to run via Console 
	public static void run() {
		
		System.out.println("Welcome to Wayne Banking Corporation");
		System.out.println("1. To login ");
		System.out.println("quit. To exit the application");
		System.out.println("Choose 1 or quit");

		
		// Continue the while loop till the user types 'q'
		do {
						
			// First call the login function and login as customer 
			commandEntered = userInput.next();
			
			if(commandEntered.equalsIgnoreCase("1")) {
				
				if(loginForCustomer(userInput)) {

					System.out.println("Welcome Customer, Login was successful.");
					// now display all the options for the customer here
					
					System.out.println("Features Menu");
					System.out.println("What would you like to do?");
					System.out.println("1. Account Information");
					System.out.println("2. Funds Transfer");
					System.out.println("3. Cards");
					System.out.println("4. Loans");
					System.out.println("5. Offers");
					System.out.println("6. Contact Us");
					System.out.println("'quit' to Exit the application");
					
					commandEntered = userInput.next();
					if(commandEntered.equalsIgnoreCase("1")) {
						// call Account Information
					}
					else if(commandEntered.equalsIgnoreCase("2")) {
						// Call Funds transfer
					}
					else if(commandEntered.equalsIgnoreCase("3")) {
						// Call Cards
					}
					else if(commandEntered.equalsIgnoreCase("4")) {
						// Call Loans
					}
					else if(commandEntered.equalsIgnoreCase("5")) {
						// Call offers
					}
					else if(commandEntered.equalsIgnoreCase("6")) {
						// Call contact us
					}
					else if(commandEntered.equalsIgnoreCase("quit")) {
						break;
					}
					else {
						System.out.println("Bad Command! Please enter again.");
					}
				}
			}
			
		}while(!commandEntered.equalsIgnoreCase(quitCommand));
	}
	
	// Login for Customers
	public static boolean loginForCustomer(Scanner userInput) {
		
		System.out.println("Hello Customer, Please enter your credentials");
		System.out.println("Enter your username:");
		setCustomerUsername(userInput.next());
		
		System.out.println("Enter your password:");
		setCustomerPassword(userInput.next());
		
		System.out.println("Forgot Password: 'yes' or 'no'");
		setForgotPassword(userInput.next());
		
		do {
			if(getForgotPassword().equalsIgnoreCase("yes")) {
				// then do something to send an email
			}
			else if(getForgotPassword().equalsIgnoreCase("no")) {
				// check if the Username and Password is correct
			}
			else {
				System.out.println("Bad Command, Please enter yes or no");
			}

		}while( !(getForgotPassword().equalsIgnoreCase("yes") 
				|| getForgotPassword().equalsIgnoreCase("no")));
		
		// verify username and password and send true if credentials are valid
		return false;
		
	}
	
}
