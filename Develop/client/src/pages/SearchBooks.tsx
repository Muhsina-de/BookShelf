import { useState, useEffect } from 'react';
import React from 'react';
import {
  Container,
  Col,
  Form,
  Button,
  Card,
  Row,
  FormGroup
} from 'react-bootstrap';
import { useMutation, useLazyQuery } from '@apollo/client';

import Auth from '../utils/auth';
import { SAVE_BOOK } from '../utils/mutation';
import { SEARCH_GOOGLE_BOOKS } from '../utils/queries';
import type { Book } from '../models/Book';

const SearchBooks = () => {
  // create state for holding returned google api data
  const [searchedBooks, setSearchedBooks] = useState<Book[]>([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  // create state to hold saved bookId values
  const [savedBookIds, setSavedBookIds] = useState<string[]>([]);

  // GraphQL mutations and queries
  const [searchGoogleBooksQuery, { data: searchData }] = useLazyQuery(SEARCH_GOOGLE_BOOKS);
  const [saveBookMutation] = useMutation(SAVE_BOOK);

  // create method to search for books and set state on form submit
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      console.log('Searching for:', searchInput);
      const result = await searchGoogleBooksQuery({ variables: { query: searchInput } });
      console.log('Search result:', result);
    } catch (err) {
      console.error('Search error:', err);
    }
  };

  // create function to handle saving a book to our database
  const handleSaveBook = async (bookId: string) => {
    // find the book in `searchedBooks` state by the matching id
    const bookToSave: Book = searchedBooks.find((book) => book.bookId === bookId)!;

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const profile = Auth.getProfile();
      console.log('Profile data:', profile);
      console.log('Token:', token);

      await saveBookMutation({
        variables: { userId: profile._id, bookInput: bookToSave },
      });

      // if book successfully saves to user's account, save book id to state
      setSavedBookIds([...savedBookIds, bookToSave.bookId]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (searchData) {
      const bookData = searchData.searchGoogleBooks.map((book: any) => ({
        bookId: book.bookId,
        authors: book.volumeInfo.authors || ['No author to display'],
        title: book.volumeInfo.title,
        description: book.volumeInfo.description || 'No description available',
        image: book.volumeInfo.imageLinks?.thumbnail || '',
        link: book.volumeInfo.infoLink || '',
      }));

      setSearchedBooks(bookData);
      setSearchInput('');
    }
  }, [searchData]);

  return (
    <>
      <div className="text-light bg-dark p-5">
        <div className="shape-1"></div>
        <div className="shape-2"></div>
        <div className="shape-3"></div>
        <div className="shape-4"></div>
        <div className="shape-5"></div>
        <Container>
          <h1>Search for Books!</h1>
          <Form onSubmit={handleFormSubmit} className="search-form">
            <Row>
              <Col xs={12} md={8}>
                <FormGroup>
                  <Form.Control
                    name='searchInput'
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    type='text'
                    size='lg'
                    placeholder='Search for a book'
                  />
                </FormGroup>
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Submit Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>

      <Container>
        <h2 className='pt-5'>
          {searchedBooks.length
            ? `Viewing ${searchedBooks.length} results:`
            : 'Search for a book to begin'}
        </h2>
        <Row>
          {searchedBooks.map((book) => {
            return (
              <Col md="4" key={book.bookId} className="book-card">
                <Card border='dark'>
                  {book.image ? (
                    <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    {Auth.loggedIn() && (
                      <Button
                        disabled={savedBookIds?.some((savedBookId: string) => savedBookId === book.bookId)}
                        className='btn-block btn-info'
                        onClick={() => handleSaveBook(book.bookId)}>
                        {savedBookIds?.some((savedBookId: string) => savedBookId === book.bookId)
                          ? 'This book has already been saved!'
                          : 'Save this Book!'}
                      </Button>
                    )}
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

export default SearchBooks;