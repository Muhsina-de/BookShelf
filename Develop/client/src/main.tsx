import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';

// Define application routes using React Router
const router = createBrowserRouter([
  {
    // Root route that renders the main App component
    path: '/',
    element: <App />,
    // Error boundary for handling navigation errors
    errorElement: <h1 className='display-2'>Wrong page!</h1>,
    // Nested routes rendered within the App component
    children: [
      {
        // Default route (index) renders the SearchBooks component
        index: true,
        element: <SearchBooks />,
      },
      {
        // Saved books route renders the SavedBooks component
        path: '/saved',
        element: <SavedBooks />,
      },
    ],
  },
]);

// Create root element and render the application
ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
);