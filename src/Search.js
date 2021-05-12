import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Book from "./Book";
import { getAll, search, update } from "./BooksAPI";

function Search() {
  const [books, setBooks] = useState([]);
  const [homeBooks, setHomeBooks] = useState([]);

  // mount logic
  useEffect(() => {
    getAll().then((books) => setHomeBooks(books));
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

  function handleSearch(evt) {
    const query = evt.currentTarget.value;

    if (!query) return setBooks([]);

    search(query)
      .then((searchBooks) => {
        if (searchBooks.error) return setBooks([]);

        // add shelf attr to searchBooks
        homeBooks.forEach(({ id, shelf }) => {
          const target = searchBooks.find((book) => book.id === id);
          if (target) target.shelf = shelf;
        });
        setBooks(searchBooks);
      })
      .catch(() => {
        alert("Something went wrong while fetching your books");
      });
  }

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            name="query"
            placeholder="Search by title or author"
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {books.map((book) => {
            return (
              <li key={book.id}>
                <Book book={book} onUpdateBook={updateBook} />
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

export default Search;
