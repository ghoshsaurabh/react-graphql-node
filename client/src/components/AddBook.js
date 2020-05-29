import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery,
} from '../queries/queries';

const AddBook = () => {
  const [form, setState] = useState({
    name: '',
    genre: '',
    authorId: '',
  });
  const { loading, error, data } = useQuery(getAuthorsQuery);
  const [addBook] = useMutation(addBookMutation);
  const submitForm = (e) => {
    e.preventDefault();
    addBook({
      variables: { ...form },
      refetchQueries: [{ query: getBooksQuery }],
    });
  };
  const getAuthors = (data) => {
    return data.authors.map((author) => {
      return (
        <option key={author.id} value={author.id}>
          {author.name}
        </option>
      );
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <React.Fragment>
      <form id='add-book' onSubmit={submitForm}>
        <div className='field'>
          <label>Book name:</label>
          <input
            type='text'
            name='name'
            onChange={(e) =>
              setState({ ...form, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div className='field'>
          <label>Genre:</label>
          <input
            type='text'
            name='genre'
            onChange={(e) =>
              setState({ ...form, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div className='field'>
          <label>Author:</label>
          <select
            name='authorId'
            onChange={(e) =>
              setState({ ...form, [e.target.name]: e.target.value })
            }
          >
            <option value='-'>Select author</option>
            {getAuthors(data)}
          </select>
        </div>

        <button>+</button>
      </form>
    </React.Fragment>
  );
};

export default AddBook;
