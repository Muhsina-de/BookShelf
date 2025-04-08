import { useState, useEffect } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { useQuery, useMutation, ApolloCache, FetchResult } from '@apollo/client';

import { GET_ME } from '../utils/queries';
import { DELETE_BOOK } from '../utils/mutation';
import Auth from '../utils/auth';
import type { User } from '../models/User';

const SavedBooks = () => {
  const [userData, setUserData] = useState<User>({
    username: '',
    email: '',
    password: '',
    savedBooks: [],
  });

  // use this to determine if `useEffect()` hook needs to run again

  const { loading, data } = useQuery(GET_ME, {
    skip: !Auth.loggedIn(),
  });

  const [deleteBook] = useMutation(DELETE_BOOK, {
    update(cache: ApolloCache<any>, { data }: FetchResult<{ deleteBook: { savedBooks: { bookId: string }[] } }>) {
      const { getMe }: any = cache.readQuery({ query: GET_ME });
      if (data?.deleteBook?.savedBooks) {
        cache.writeQuery({
          query: GET_ME,
          data: { getMe: { ...getMe, savedBooks: data.deleteBook.savedBooks } },
        });
      }
    },
  });

  useEffect(() => {
    if (data) {
      setUserData(data.getMe);
    }
  }, [data]);

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId: string) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await deleteBook({
        variables: { userId: Auth.getProfile()._id, bookId },
      });

      // upon success, remove book's id from local state
      setUserData((prevState: User) => ({
        ...prevState,
        savedBooks: prevState.savedBooks.filter((book) => book.bookId !== bookId),
      }));
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div className='text-light bg-dark p-5'>
        <Container>
          {userData.username ? (
            <h1>Viewing {userData.username}'s saved books!</h1>
          ) : (
            <h1>Viewing saved books!</h1>
          )}
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${
                userData.savedBooks.length === 1 ? 'book' : 'books'
              }:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {userData.savedBooks.map((book, index) => {
            return (
              <Col md='4' key={`${book.bookId}-${index}`}>
                <Card border='dark'>
                  {book.image ? (
                    <Card.Img
                      src={book.image}
                      alt={`The cover for ${book.title}`}
                      variant='top'
                    />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button
                      className='btn-block btn-danger'
                      onClick={() => handleDeleteBook(book.bookId)}
                    >
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;