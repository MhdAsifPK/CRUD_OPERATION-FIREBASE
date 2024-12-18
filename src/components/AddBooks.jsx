import { useEffect, useState } from "react";
import { db } from "../Firebase/firebaseConfig";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

const AddBooks = () => {
  // =================THIS FOR STORING INPUT FIELD===================================
  const [bookName, setBookName] = useState("");
  const [price, setPrice] = useState("");
  // console.log(bookName);

  //================== FOR DISPALYA THE BOOK LIST===================================
  const [bookList, setBookList] = useState([]);
  // console.log(bookList);
  //  =================BOOKS ID FOR STORING THE BOOKS ID'S==========================
  const [bookId, setBookId] = useState(null);

  //=================== CREATE======================================================

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
        console.log(error);
      });
  };

  //================= READ & GET===================================================
  const getBookList = async () => {
    const BookCollectionRef = collection(db, "books");
    const data1 = await getDocs(BookCollectionRef);
    // console.log(data1);
    const filteredData = data1.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    console.log(filteredData);
    setBookList(filteredData);
  };

  //=============== DELETE=======================================================

  const bookDelete = async (id) => {
    const bookDoc = doc(db, "books", id);
    await deleteDoc(bookDoc);
    setBookList(bookList.filter((p) => p.id !== id));
  };

  //=============== UPDATE=======================================================

  const bookUpdate = () => {
    const bookDoc = doc(db, "books", bookId);
    updateDoc(bookDoc, { bookName, price });
  };
  //============== BOOK EDIT BUTTON FUNCTION=====================================
  const bookEdit = async (id) => {
    const bookDoc = doc(db, "books", id);
    const booksedit = await getDoc(bookDoc);
    console.log(booksedit.id);
    console.log(booksedit.data());
    setBookName(booksedit.data().bookName);
    setPrice(booksedit.data().price);
    setBookId(booksedit.id);
  };
  useEffect(() => {
    getBookList();
    bookUpdate;
    // bookDelete();
  }, [bookName, price]);

  return (
    <div>
      <form onSubmit={addBook} className="addBookForm">
        <label>Book Name</label>
        <input
          type="text"
          name="book name"
          placeholder="Enter Book Name"
          value={bookName}
          onChange={(e) => setBookName(e.target.value)}
        />
        <label htmlFor="price">Price</label>
        <input
          type="text"
          name="price"
          placeholder="Enter Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input type="submit" value="Add Book" />
        <button onClick={bookUpdate}>Update</button>
      </form>

      {/*=================== BOOK LISST ===============================================*/}

      <div>
        {bookList.map((booklist) => (
          <div key={booklist.id}>
            <h2>BOOK:{booklist.bookName}</h2>
            <p>price:{booklist.price}</p>
            <button onClick={() => bookDelete(booklist.id)}>delete</button>
            <button
              className="edit"
              onClick={() => {
                bookEdit(booklist.id);
              }}
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddBooks;
