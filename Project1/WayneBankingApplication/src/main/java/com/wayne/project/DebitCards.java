package com.wayne.project;

public class DebitCards implements CardsI {

	// private Account AccountInformation;
	
	@Override
	public void displayStatus() {
		
		// use Account to pull the information of the account holder
		// Use the same query to check the debit card information
		// Display if the card is blocked, active, or expired
	}

	@Override
	public boolean upgradeCard() {
		
		// use the account to pull the information from the account holder
		// Check if there are options to upgrade the card
		
		// Logic to upgrade card
		// Display data to show the cards - platinum, silver, gold
		// Display what type is the present debit card
		return false;
	}

	@Override
	public boolean redeemCardPoints() {
		
		// 
		return false;
	}

	@Override
	public boolean blockCard() {
		return false;
	}

	@Override
	public boolean generatePinCode() {
		return false;
	}

	@Override
	public boolean setOnlineUsageLimit() {
		return false;
	}

	@Override
	public boolean requestForNewCard() {
		return false;
	}

	@Override
	public boolean setPaymentReminders() {
		return false;
	}

}
