const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.status(200).json(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  let bookSelected = books[isbn]
  return res.status(200).json(bookSelected);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const authorName = req.params.author; // Get the author from the URL parameter
  const bookKeys = Object.keys(books); // Get all the keys (book IDs)

  const matchingBooks = []; // Array to store books by the specified author

  for (const key of bookKeys) {
    const book = books[key];
    if (book.author === authorName) {
      matchingBooks.push(book);
    }
  }
  if (matchingBooks.length > 0) {
     return res.status(200).json(matchingBooks); // Send the matching books as JSON
  } else {
    return res.status(404).json({ message: "No books found for that author." }); // Send 404 if no books found
  }
  
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here

  const title = req.params.title;
  const matchingBooks = [];

  for (const key in books) {  // Iterate through the keys (book IDs)
    if (books.hasOwnProperty(key)) { 
      const book = books[key];
      if (book.title.toLowerCase().includes(title.toLowerCase())) { // Case-insensitive search
        matchingBooks.push(book);
      }
    }
  }

  if (matchingBooks.length > 0) {
    return res.status(200).json(matchingBooks);
  } else {
    res.status(404).json({ message: "No books found with that title." });
  }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  
  const isbn = req.params.isbn;

  if (books.hasOwnProperty(isbn)) { // Check if the ISBN exists as a key
    const book = books[isbn];
    if (book && book.reviews) {
      res.status(200).json(book.reviews);
    } else {
      res.status(404).json({ message: "Reviews not found for that ISBN." });
    }
  } else {
    res.status(404).json({ message: "Book not found for that ISBN." });
  }
  
});

module.exports.general = public_users;
