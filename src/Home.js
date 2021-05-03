import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Book from "./Book";
import { getAll, update } from "./BooksAPI";

function Home() {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    getAll()
      .then((books) => {
        setBooks(books);
      })
      .catch(() => {
        alert("Something went wrong while fetching your books");
      });
  }, []);

  function updateBook(book, shelf) {
    update(book, shelf)
      .then((res) => {
        const slice = books.slice();
        // update the updated book shelf in our local list on success
        slice.find(({ id }) => id === book.id).shelf = shelf;
        setBooks(slice);
      })
      .catch(() => {
        alert("Something went wrong while updating the book");
      });
  }

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {books
                  .filter(({ shelf }) => shelf === "currentlyReading")
                  .map((book) => {
                    return (
                      <li key={book.id}>
                        <Book book={book} onUpdateBook={updateBook} />
                      </li>
                    );
                  })}
              </ol>
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Want to Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {books
                  .filter(({ shelf }) => shelf === "wantToRead")
                  .map((book) => {
                    return (
                      <li key={book.id}>
                        <Book book={book} onUpdateBook={updateBook} />
                      </li>
                    );
                  })}
              </ol>
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {books
                  .filter(({ shelf }) => shelf === "read")
                  .map((book) => {
                    return (
                      <li key={book.id}>
                        <Book book={book} onUpdateBook={updateBook} />
                      </li>
                    );
                  })}
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
}

export default Home;
