package com.informed.dev.library;

public interface Reservable {
	
	public boolean isReserved();
	public boolean canReserve(Member member);
	public boolean reserveItemFor(Member member);
	
	
	
	
}
