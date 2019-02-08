package com.informed.dev.library;

public class ReservableBook extends Book implements Reservable {

	private Member reserver;

	public ReservableBook(String title, String author, String isbn, Genre genre) {
		super(title, author, isbn, genre);
	}

	public boolean isReserved() {
		return reserver != null;
	}

	public boolean canReserve(Member member) {
		return canBeBorrowedBy(member);
	}

	public boolean reserveItemFor(Member member) {
		if(isBorrowed() && !isReserved() && canReserve(member)) {
			reserver = member;
			return true;
		} else {
			return false;
		}
	}

	@Override
	public void returnItem() {
		super.returnItem();
		if (reserver != null) {
			this.borrowItemBy(reserver);
			reserver = null;
		}




	}







}
