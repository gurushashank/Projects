package com.wayne.project;

public interface CardsI {

	
	// Display the status of the Card -- Credit or Debit
	public void displayStatus();
	
	/* Check whether the card can be upgraded or not, if yes then upgrade it and 
	   return if it was successful */
	public boolean upgradeCard();
	
	// Redeem card points if they are present for the card
	public boolean redeemCardPoints();
	
	// Block card for the user
	public boolean blockCard();
	
	// Generate a new pin code for the user
	public boolean generatePinCode();
	
	// Set the online usage limit for the cards when used for transactions over the internet
	public boolean setOnlineUsageLimit();
	
	// Request for a new card
	public boolean requestForNewCard();
	
	// Set the payment reminders for the card
	public boolean setPaymentReminders();
	
}
