import { useState } from "react";
import { Link } from "react-router-dom";
import Book from "./Book";
import { getAll, search, update } from "./BooksAPI";

function Search() {
  const [books, setBooks] = useState([]);

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
    evt.preventDefault();
    const data = new FormData(evt.currentTarget);
    const query = data.get("query");

    if (!query) return setBooks([]);

    Promise.all([getAll(), search(query)])
      .then((values) => {
        if (books.error) return setBooks([]);

        const homeBooks = values[0];
        const searchBooks = values[1];
        // merge common home & search books first
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
          <form onSubmit={handleSearch}>
            <input
              type="text"
              name="query"
              placeholder="Search by title or author"
            />
          </form>
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
