import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';
import bookshelf from '../assets/bookshelf.png';
import Auth from '../utils/auth';

// Navigation bar component with authentication functionality
const AppNavbar = () => {
  // State for controlling the login/signup modal visibility
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* Main navigation bar */}
      <Navbar bg='dark' variant='dark' expand='lg'>
        <Container fluid>
          {/* Brand/logo section with link to home */}
          <Navbar.Brand as={Link} to='/' className='d-flex align-items-center'>
            <img
              src={bookshelf}
              height='50'
              className='me-2'
              alt="BookShelf Logo"
            />
            <span>BookShelf - <em>Google Books Search</em></span>
          </Navbar.Brand>

          {/* Mobile navigation toggle */}
          <Navbar.Toggle aria-controls='navbar' />

          {/* Navigation links container */}
          <Navbar.Collapse id='navbar' className='d-flex flex-row-reverse'>
            <Nav className='ml-auto d-flex'>
              {/* Search books link - always visible */}
              <Nav.Link as={Link} to='/'>
                Search For Books
              </Nav.Link>

              {/* Conditional rendering based on authentication status */}
              {Auth.loggedIn() ? (
                <>
                  {/* Links shown when user is logged in */}
                  <Nav.Link as={Link} to='/saved'>
                    See Your Books
                  </Nav.Link>
                  <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
                </>
              ) : (
                /* Login/Signup button shown when user is not logged in */
                <Nav.Link onClick={() => setShowModal(true)}>Login/Sign Up</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Authentication Modal */}
      <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal'>
        {/* Tab container for switching between login and signup forms */}
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header closeButton>
            <Modal.Title id='signup-modal'>
              {/* Navigation pills for switching between login and signup */}
              <Nav variant='pills'>
                <Nav.Item>
                  <Nav.Link eventKey='login'>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Tab content container for login and signup forms */}
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

export default AppNavbar;
