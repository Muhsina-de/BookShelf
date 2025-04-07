import { gql } from '@apollo/client';

export const GET_ME = gql`
  query getMe {
    getMe {
      _id
      username
      email
      savedBooks {
        bookId
        title
        authors
        description
        imagelink
      }
      bookCount
    }
  }
`;

export const SEARCH_GOOGLE_BOOKS = gql`
  query searchGoogleBooks($query: String!) {
    searchGoogleBooks(query: $query) {
      items {
        bookId
        volumeInfo {
          title
          authors
          description
          imageLinks {
            thumbnail
          }
       
        }
      }
    }
  }
`;