package com.informed.dev.entity;

public class Item {

	private int id;
	private String name;
	private String author;
	private String isbn;
	private String genre;
	private boolean borrowed;

	public Item() { 
		this(0, "name?", "author?", "isbn?", "genre?", false);
	}
	
	public Item(int id, String name, String author, String isbn, String genre, boolean borrowed) {
		this.id = id;
		this.name = name;
		this.author = author;
		this.isbn = isbn;
		this.genre = genre;
		this.borrowed = borrowed;
	}
		
	public void display() {
		System.out.printf("%s\n", this);
	}
	
	@Override
	public String toString() {
		return String.format("[%d] %s, %s, %s, %s", id, name, author, isbn, genre, borrowed);
	}
		
	public void setId(int id) {
		this.id = id;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public void setIsbn(String isbn) {
		this.isbn = isbn;
	}
	
	public void setGenre(String genre) {
		this.genre = genre;
	}
	
	public void setBorrowed(boolean borrowed) {
		this.borrowed = borrowed;
	}

	public int getId() { 
		return id;
	}

	public String getName() {
		return name;
	}

	public String getAuthor() {
		return author;
	}

	public String getIsbn() {
		return isbn;
	}
	
	public String getGenre() {
		return genre;
	}
	
	public boolean borrowed() {
		return borrowed;
	}
}

