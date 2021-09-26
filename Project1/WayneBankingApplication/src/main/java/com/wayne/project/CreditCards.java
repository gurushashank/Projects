package com.wayne.project;

public class CreditCards implements CardsI {

	@Override
	public void displayStatus() {

	}

	@Override
	public boolean upgradeCard() {
		return false;
	}

	@Override
	public boolean redeemCardPoints() {
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
	
	public boolean setAutoPaymentForPayingBills() {
		
		return false;
	}

	public boolean setAutoPayForCreditCard() {
		
		
		return false;
	}
}
