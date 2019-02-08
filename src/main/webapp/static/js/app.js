
var nextItemNum = 3;	// For addToList, see later
var nextEeElt = 1;		// For fetchEmpList / add Employee LI to empList UL

/*
 * ====== Functions for INPUT... panels ======
 */
showMsg = function(msg) {
	document.getElementById('message').innerHTML = msg;
}

showPanel = function(panel) {
	if (panel === 'all') {
		showAllPanels();
	}
	else {
		hideAllPanels();
		if (panel != 'none') {
			setVisible(true, panel+"-panel");
		}
	}
}

setVisible = function(show, ele) {
	var field=document.getElementById(ele);
	if (field != null){
		if (show) {		
			field.style.display = "block";
		}
		else {
			field.style.display = "none";
		}
	}
}
showAllPanels = function() {
	setVisible(true, "input-panel");
	setVisible(true, "librarian-panel");
	setVisible(true, "bookworm-panel");
	setVisible(true, "rest-panel");
	setVisible(true, "list-panel");
	setVisible(true, "pathParam-panel");
	setVisible(true, "lookupItem-panel");
	setVisible(true, "addItem-panel");
	setVisible(true, "restList-panel");
	setVisible(true, "bookDetails-panel");
	setVisible(true, "searchList-panel");

}
hideAllPanels = function() {
	setVisible(false, "input-panel");
	setVisible(false, "librarian-panel");
	setVisible(false, "bookworm-panel");
	setVisible(false, "rest-panel");
	setVisible(false, "list-panel");
	setVisible(false, "pathParam-panel");
	setVisible(false, "lookupItem-panel");
	setVisible(false, "addItem-panel");
	setVisible(false, "restList-panel");
	setVisible(false, "bookDetails-panel");
	setVisible(false, "searchList-panel");
}

rest2 = function() {
	var msgNum = document.getElementById('msgNum').value;
	const Http = new XMLHttpRequest();
	const url= 'http:rest/msg' + msgNum;
	try {
		Http.open("GET", url);
		Http.send();
	}
	catch (err) { // "No such URL" Exception not shown, but demonstrates JS exception handling:
		showMsg("ERROR in GET: " + url + " : " + err.message);
	}
	Http.onreadystatechange=(e) => {
		// Could check Http.status here, see later examples below
		showMsg(Http.responseText);
	}
}


//Demo of dynamically adding items to a list on the page, eg to display a list of employees from REST server
addToList = function() {
	var ul = document.getElementById("dynamic-list");
	var li = document.createElement("li");
	li.appendChild(document.createTextNode(nextItemNum * 111));
	li.setAttribute("id", "element" + nextItemNum++);
	ul.appendChild(li);
}


//Demo of using a single REST handler for many different resources / requests
restPathParam = function() {
	var eeNum= document.getElementById('eeNum').value;
	const Http = new XMLHttpRequest();
	const url= 'http:rest/item/' + eeNum + '/name';
	document.getElementById('eePathUri').innerHTML = 'GET &nbsp;' + url;
	Http.open("GET", url);
	Http.send();
	Http.onreadystatechange=(e) => {
		document.getElementById('eeName').innerHTML = Http.responseText;
	}
}


//Demo of receiving data from REST interface - AS A JSON OBJECT
getItemName = function() {
	var eeNum= document.getElementById('eeNum2').value;
	const Http = new XMLHttpRequest();
	const url= 'http:rest/item/' + eeNum;
	document.getElementById('eeJsonUri').innerHTML = 'GET &nbsp;' + url;
	Http.open("GET", url);
	Http.send();
	Http.onreadystatechange=(e) => {
		if (Http.readyState == 4) {
			if (Http.status == 200) {
				var ee = JSON.parse(Http.responseText);
				console.log("name= "+ ee.name);
				document.getElementById('ee2Name').innerHTML = ee.name;
				document.getElementById('ee2Author').innerHTML = ee.author;
				document.getElementById('ee2Isbn').innerHTML = ee.isbn;
				document.getElementById('ee2Genre').innerHTML = ee.genre;
				showMsg("GET succeeded")
			}
			else {
				showMsg( 'ERROR: ' + Http.status + ' ('+Http.statusText+')' );
			}
		}
	}
}


//Demo of writing JSON to REST interface (using POST, PUT http verbs)
//First some utility functions for the `editXyz` functions of this demo:
displayEee3 = function(ee) {
	document.getElementById('ee3Id').value = ''+ ee.id; // For POST/create we need to show ID of newly created Employee
	document.getElementById('ee3Name').value = ee.name;
	document.getElementById('ee3Author').value = ee.author;
	document.getElementById('ee3Isbn').value = ee.isbn;
	document.getElementById('ee3Genre').value = ee.genre;
	document.getElementById('ee3Borrowed').value = ee.borrowed;
}

editHttpStateChangeHandler = function(e) {
	var Http = e.currentTarget;
	if (Http.readyState == 4) {
		if (Http.status == 200) {
			displayEee3(JSON.parse(Http.responseText));	// Display the returned Employee onto ee3* fields
			showMsg('http request succeeded'); // Cant determine which http verb from e or Http
		}
		else {
			showMsg( 'ERROR: ' + Http.status + ' ('+Http.statusText+')' );
		}
	}
}

//Constructor function
function Item (id, name, author, isbn, genre) { 
	this.id = id;
	this.name = name;
	this.author = author;
	this.isbn = isbn;
	this.genre = genre;
}

createItem_ee3 = function() {
	var eeNum = document.getElementById('ee3Id').value;
	if (eeNum == '') {
		eeNum= 0;	// POST (and others?) need an int here, for when Jackson creates Employee DTO to pass into REST handler
	}
	var name = document.getElementById('ee3Name').value;
	var author = document.getElementById('ee3Author').value;
	var isbn = document.getElementById('ee3Isbn').value;
	var genre = document.getElementById('ee3Genre').value;
	var item = new Item( eeNum, name, author, isbn, genre );
	return item;
}

//Read JSON. As per earlier `getAsJson` demo, but factored out the readystatechange handler and object display
editGetJson = function() {
	var eeNum= document.getElementById('ee3Id').value;
	const url= 'http:rest/item/' + eeNum;
	const Http = new XMLHttpRequest();
	document.getElementById('eeEditUri').innerHTML = 'GET &nbsp;' + url;
	Http.open("GET", url);
	Http.send();
	Http.onreadystatechange = editHttpStateChangeHandler;
}

clickableGetJson = function() {
	var eeNum= document.getElementById('ee4Id').value;
	const url= 'http:rest/item/' + eeNum;
	const Http = new XMLHttpRequest();
	document.getElementById('eeEditUri').innerHTML = 'GET &nbsp;' + url;
	Http.open("GET", url);
	Http.send();
	Http.onreadystatechange = editHttpStateChangeHandler;
}

//Demo of PUT (update an Item Status)
editUpdateItem= function() {
	var item = createItem_ee3();	// Create from emp3* fields
	const url= 'http:rest/item/';
	const Http = new XMLHttpRequest();
	document.getElementById('eeEditUri').innerHTML = 'PUT &nbsp;' + url;
	Http.onerror=(e) => { // Not used, see onreadystatechange below instead, but leave this here as an example
		console.log(e);
	}
	Http.open("PUT", url);
	Http.setRequestHeader("Content-Type", "application/json");
	Http.send( JSON.stringify(item) );
	Http.onreadystatechange = editHttpStateChangeHandler;
}

//Demo of POST (create an Employee)
editCreateItem = function() {
	var item = createItem_ee3();	// Create from emp3* fields
	const url= 'http:rest/item/';
	const Http = new XMLHttpRequest();
	document.getElementById('eeEditUri').innerHTML = 'POST &nbsp;' + url;
	Http.open("POST", url, true);
	Http.setRequestHeader("Content-Type", "application/json");
	Http.send( JSON.stringify(item) );
	Http.onreadystatechange = editHttpStateChangeHandler;
}

clickableCreateItem = function() {
	var item = createItem_ee4();	// Create from emp3* fields
	const url= 'http:rest/item/';
	const Http = new XMLHttpRequest();
	document.getElementById('eeEditUri').innerHTML = 'POST &nbsp;' + url;
	Http.open("POST", url, true);
	Http.setRequestHeader("Content-Type", "application/json");
	Http.send( JSON.stringify(item) );
	Http.onreadystatechange = editHttpStateChangeHandler;
}

//Demo of fetching a List of Items
fetchItemList = function() {
	const url= 'http:rest/item/list';
	const Http = new XMLHttpRequest();
	document.getElementById('eeEditUri').innerHTML = 'GET &nbsp;' + url;
	Http.open("GET", url);
	Http.setRequestHeader("Content-Type", "application/json");
	Http.send( );
	Http.onreadystatechange=(e) => {
		if (Http.readyState == 4) {
			if (Http.status == 200) {
				var eeList = JSON.parse(Http.responseText);
				nextEeElt = 1;
				var ul = document.getElementById("ee-list");
				while (ul.firstChild) {
				    ul.removeChild(ul.firstChild);
				}
				for (var i = 0; i < eeList.length; i++) {
					var ee= eeList[i];
					var eeDetails = "Item "+ ee.id + ": "+ ee.name + ", "+ ee.author + ", " + ee.isbn + ", " + ee.genre;
					var li = document.createElement("li");
					li.appendChild(document.createTextNode(eeDetails));
					li.setAttribute("onclick", 'fetchItemView(this.id)');
					li.setAttribute("id", "restListItem-" + nextEeElt++);
					ul.appendChild(li);
				}
				showMsg("GET succeeded")
			}
			else {
				showMsg( 'ERROR: ' + Http.status + ' ('+Http.statusText+')' );
			}
		}
	}
}

	//Demo of fetching a List of Employees
searchItemList = function() {
	var item = createItem_ee3();	// Create from emp3* fields
	var searchInput= document.getElementById('searchInput').value;
	const url= 'http:rest/item/list';
	const Http = new XMLHttpRequest();
	document.getElementById('eeEditUri').innerHTML = 'GET &nbsp;' + url;
	Http.open("GET", url);
	Http.setRequestHeader("Content-Type", "application/json");
	Http.send( );
	Http.onreadystatechange=(e) => {
		if (Http.readyState == 4) {
			if (Http.status == 200) {
				var eeList = JSON.parse(Http.responseText);
				nextEeElt = 1;
				var ul = document.getElementById("eee-list");
				while (ul.firstChild) {
				    ul.removeChild(ul.firstChild);
				}
				for (var i = 0; i < eeList.length; i++) {
					var ee= eeList[i];
					if (ee.name.includes(searchInput)) {
					var eeDetails = "Item "+ ee.id + ": "+ ee.name + ", "+ ee.author + ", " + ee.isbn + ", " + ee.genre;
					var li = document.createElement("li");
					li.appendChild(document.createTextNode(eeDetails));
					li.setAttribute("onclick", 'fetchItemView(this.id)');
					li.setAttribute("id", "restListItem-" + ee.id);
					ul.appendChild(li);
					}
				}
				showMsg("GET succeeded")
			}
			else {
				showMsg( 'ERROR: ' + Http.status + ' ('+Http.statusText+')' );
			}
		}
	}
}

fetchItemView = function(id) {
  // showMsg("fetchItemView() called from button/ element "+ id);
  var idNum = id.substring( id.indexOf("-") + 1 );
  setVisible(true, "bookDetails-panel");
  document.getElementById("ee4Id").value= idNum; // Set ID of emp to display on next line
  clickableGetJson(); // Call earlir function to fetch and display the clicked employee
  // displayEee(JSON.parse(Http.responseText), "ee3");       // Display the returned Employee onto ee3* fields
 // displayEee(eeArray[idNum-1], "restListItem"); // id is 1-based, convert to 0-based array index
}

checkPassword = function(){
	var password= document.getElementById('password').value;
	if (password == "password"){
		window.location.href="librarianIndex.html";
	}
	else {
		alert("That is the incorrect password");
	}
}

checkUsername = function(){
	var password= document.getElementById('bookwormPassword').value;
	if (password == "password"){
		window.location.href="bookwormIndex.html";
	}
	else {
		alert("That is the incorrect password");
	}
}

//borrowItem = function(){
//	var eeNum = document.getElementById('ee4Id').value;
//	var bookName =document.getElementById('ee3Name').value;
//	if (ee4Id != null){
//	restBorrowed();
//	alert ("You have borrowed " + bookName);
//	setItemAsBorrowed();
//	}
//	else{
//		alert("Failure, this book is borrowed");
//	}
//}

//setItemAsBorrowed = function (){
//	var eeNum = document.getElementById('ee4Id').value;
//	var borrowed = "borrowed";
//	var eeNumStatus= eeNum + borrowed;
//}

restBorrowed = function() {
	var eeNum = document.getElementById('ee4Id').value;
	var bookName =document.getElementById('ee3Name').value;
	var borrowedStatus = document.getElementById('ee3Borrowed').value;
	if (ee4Id != null && borrowedStatus != true){
		alert ("You have borrowed " + bookName);
	} else {
		alert("Failure, this book is borrowed");
	}
	const Http = new XMLHttpRequest();
	const url= 'http:rest/borrow' + ee4Id;
	try {
		Http.open("GET", url);
		Http.send();
	}
	catch (err) { // "No such URL" Exception not shown, but demonstrates JS exception handling:
		showMsg("ERROR in GET: " + url + " : " + err.message);
	}
	Http.onreadystatechange=(e) => {
		// Could check Http.status here, see later examples below
		showMsg(Http.responseText);
	}
}


	
