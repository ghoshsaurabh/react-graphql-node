import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { getBookQuery } from '../queries/queries';

function BookDetails(props) {
  const displayBookDetails = (book) => {
    return (
      <div>
        <h2>{book.name}</h2>
        <p>{book.genre}</p>
        <p>{book.author.name}</p>
        <p>All books by this author</p>
        <ul className='other-books'>
          {book.author.books.map((book) => {
            return <li key={book.id}>{book.name}</li>;
          })}
        </ul>
      </div>
    );
  };

  const { loading, error, data } = useQuery(getBookQuery, {
    variables: { id: props.bookId },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return <div id='book-details'>{displayBookDetails(data.book)}</div>;
}

export default BookDetails;
