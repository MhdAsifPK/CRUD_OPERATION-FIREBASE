import React, { useState } from "react";
import { db } from "../Firebase/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

const AddBooks = () => {
  const [bookName, setBookName] = useState("");
  const [price, setPrice] = useState("");

  const addBook = (e) => {
    e.preventDefault();

    const booksCollection = collection(db, "books");
    // const bookData = { bookName, price, currency };
    addDoc(booksCollection, { bookName, price })
      .then(() => {
        setBookName("");
        setPrice("");
        console.log("book added successfully");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <form onSubmit={addBook} className="addBookForm">
        <label htmlFor="book name">Book Name</label>
        <input
          type="text"
          name="book name"
          placeholder="Enter Book Name"
          onChange={(e) => setBookName(e.target.value)}
        />
        <label htmlFor="price">Price</label>
        <input
          type="text"
          name="price"
          placeholder="Enter Price"
          onChange={(e) => setPrice(e.target.value)}
        />
        <input type="submit" value="Add Book" />
      </form>
    </div>
  );
};

export default AddBooks;
