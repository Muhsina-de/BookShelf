import { ApolloProvider } from '@apollo/client';
import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Navbar from './components/Navbar';
import Auth from './utils/auth';

// Import the Inter font
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';

// Import styles
import './App.css';

const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = Auth.getToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only',
    },
  },
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="app">
        <Navbar />
        <Container className="main-content">
          <Outlet />
        </Container>
      </div>
    </ApolloProvider>
  );
}

export default App;
