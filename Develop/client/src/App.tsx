import './App.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Create HTTP link for GraphQL API connection
// Uses environment variable for production, falls back to localhost for development
const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_URI || 'http://localhost:3001/graphql',
  credentials: 'same-origin'
});

// Authentication middleware for Apollo Client
// Attaches JWT token to every GraphQL request
const authLink = setContext((_, { headers }: { headers?: Record<string, string> }) => {
  // Retrieve authentication token from localStorage
  const token = localStorage.getItem('id_token');
  // Attach token to request headers if it exists
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Initialize Apollo Client with authentication and caching configuration
const client = new ApolloClient({
  // Combine authentication middleware with HTTP link
  link: authLink.concat(httpLink),
  // Use in-memory cache for storing query results
  cache: new InMemoryCache(),
  // Configure default options for queries
  defaultOptions: {
    watchQuery: {
      // Always fetch fresh data from network
      fetchPolicy: 'network-only',
    },
  },
});

// Main App component
function App() {
  return (
    // Wrap application with Apollo Client provider
    <ApolloProvider client={client}>
      {/* Main layout container with minimum viewport height */}
      <div className="flex-column justify-flex-start min-100-vh">
        <Navbar />
        {/* Main content container */}
        <div className="container">
          {/* Router outlet for rendering nested routes */}
          <Outlet />
        </div>
        <Footer />
      </div>
    </ApolloProvider>
  );
}

export default App;
