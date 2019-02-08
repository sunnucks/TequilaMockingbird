package com.informed.dev.rest;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.informed.dev.entity.Item;
import com.informed.dev.library.Book;

@Path("/item")
public class ItemRestService {

	// For simple demo purposes, Would normally reference employeeDAO / Repository instead:
	static List<Item> dummyItems = null;
	private void initDummyItems() {
		if (dummyItems == null) {
			dummyItems = new ArrayList<Item>();
			dummyItems.add( new Item(1, "Tequila Mockingbird", "Harper Lee", "978-0141439563", "Fiction", false));
			dummyItems.add( new Item(2, "Lord of the Gins", "Gillian Clements", "978-0749649333", "NonFiction", false) );
			dummyItems.add( new Item(3, "Harry Potter and the Goblet of Beer", "J K Rowling", "B001TIBX3K", "Children", false));
			dummyItems.add( new Item(4, "Charlie and the Vodka Factory", "Roald Dahl", "WE4567GH43", "Children", false));
			dummyItems.add( new Item(5, "Scotch-22", "Benjamin Franklin", "5C0TCH12345", "Fiction", false));
		}
	}

	@GET
	@Path("{id}/name")
	@Produces(MediaType.TEXT_PLAIN)
	// eg browse to http://localhost:7070/rest/employee/3/name
	public String getItemName(@PathParam("id") String id) {
		initDummyItems();
		try {
			int num= Integer.parseInt(id);
			return dummyItems.get(num - 1).getName();	// Emp id is 1-based
		}
		catch (Exception ex) {
			return "Error getting emp with id: " + id + " : " + ex;
		}
	}
	
	@GET
	@Path("/borrow/{bookId}")
	@Produces(MediaType.APPLICATION_JSON)
	// eg browse to http://localhost:7070/rest/employee/3/name
	public Item borrowBook(@PathParam("bookId") String bookId) {
		initDummyItems();
		try {
			System.out.println("In borrowBook id = " + bookId);
			int id = Integer.parseInt(bookId);		
			Item item = dummyItems.get(id-1);
			item.setBorrowed(true);
			return item;
			
		}
		catch (Exception ex) {
			return null;
		}
	}

	@GET
	@Path("/return/{bookId}")
	@Produces(MediaType.APPLICATION_JSON)
	// eg browse to http://localhost:7070/rest/employee/3/name
	public Item returnBook(@PathParam("bookId") String bookId) {
		initDummyItems();
		try {
			System.out.println("In borrowBook id = " + bookId);
			int id = Integer.parseInt(bookId);		
			Item item = dummyItems.get(id-1);
			item.setBorrowed(false);
			return item;
			
		}
		catch (Exception ex) {
			return null;
		}
	}
	
	
	@GET
	@Path("/check/{bookId}")
	@Produces(MediaType.TEXT_PLAIN)
	// eg browse to http://localhost:7070/rest/employee/3/name
	public boolean checkStatus(@PathParam("bookId") String bookId) {
		initDummyItems();
		int id = Integer.parseInt(bookId);
		System.out.println("In checkStatus id = " +id);
		Item item = dummyItems.get(id-1);
		return item.borrowed();
	}

	

	@GET
	@Path("/{id}")
	@Produces( {MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON} )
	// eg browse to http://localhost:7070/rest/employee/3
	public Item produceJSON( @PathParam("id") String id ) {
		System.out.println( "In produceJSON() for id= "+ id);
		initDummyItems();
		Item ret = null;
		try {
			int num= Integer.parseInt(id);
			ret = dummyItems.get(num - 1);	// Emp id is 1-based
		}
		catch (Exception ex) {
			ex.printStackTrace();
			ret= new Item();	// "blank" emp containing err msg fnow, TODO Ideally return status error & details
									// Note this creates a new Employee and increments the ID sequence too, bad!!
			ret.setName(ex.toString());
		}
		return ret;
	}

	@POST
	@Consumes({MediaType.APPLICATION_JSON})
	// eg POST to http://localhost:7070/rest/employee
	public Response postItem (Item ee) {
		System.out.println("In postItem() with ee = "+ ee);
		initDummyItems();
		int newId= dummyItems.size() + 1;
		ee.setId(newId);
		dummyItems.add(ee);
		System.out.println("In postItem() , added new ee: "+ ee);
		return Response.status(200).entity(ee).build();
	}

	@PUT
	@Consumes({MediaType.APPLICATION_JSON})
		public Response putItem (Item eei) {
		System.out.println("In putItem() with eei = "+ eei);
		initDummyItems();
		int id = eei.getId();
		try {
			Item item = dummyItems.get(id - 1);	// Emp id is 1-based
			System.out.println("item #"+ id+ " was: "+ item);
			item.setName(eei.getName());
			item.setAuthor(eei.getAuthor());
			item.setIsbn(eei.getIsbn());
			item.setGenre(eei.getGenre());
			System.out.println("Updated item #"+ id+ " to: "+ item);
			Item item2 = dummyItems.get(id - 1);	// Emp id is 1-based
			return Response.status(200).entity(item).build();
		}
		catch (Exception ex) {
			ex.printStackTrace();
			return Response.status(416).
					entity("Item "+ id+ " not found").
					build();
		}
	}
	
	@GET
	@Path("/list")
	@Produces( {MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON} )
	// eg browse to http://localhost:7070/rest/employee/all
	public List<Item> itemList() {
		System.out.println("in ItemList");
		initDummyItems();
		return dummyItems;
	}
	

}
