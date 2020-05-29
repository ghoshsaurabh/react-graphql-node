import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { getBooksQuery } from '../queries/queries';
import BookDetails from './BookDetails';

const BookList = () => {
  const displayBooks = (data) => {
    return data.books.map((book) => {
      return (
        <li key={book.id} onClick={(e) => setBookId({ bookId: book.id })}>
          {book.name}
        </li>
      );
    });
  };
  const [bookId, setBookId] = useState('');
  const { loading, error, data } = useQuery(getBooksQuery);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <React.Fragment>
      <h1>Book List</h1>
      <ul id='book-list'>{displayBooks(data)}</ul>
      {bookId && (
        <React.Fragment>
          <hr />
          <BookDetails {...bookId} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default BookList;
