import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import bookshelf from '../assets/bookshelf.png';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <Container>
        <Row className="align-items-center">
          <Col md={4} className="text-center text-md-start mb-3 mb-md-0">
            <div className="d-flex align-items-center justify-content-center justify-content-md-start">
              <img src={bookshelf} alt="BookShelf Logo" height="30" className="me-2" />
              <span>BookShelf</span>
            </div>
            <p className="mt-2 mb-0 small">Your Personal Literary Universe</p>
          </Col>
          <Col md={4} className="text-center mb-3 mb-md-0">
            <h5 className="mb-3">Quick Links</h5>
            <div className="d-flex flex-column">
              <Link to="/" className="text-light text-decoration-none mb-2">Search Books</Link>
              <Link to="/saved" className="text-light text-decoration-none">Saved Books</Link>
            </div>
          </Col>
          <Col md={4} className="text-center text-md-end">
            <p className="mb-1">Made with ❤️ by</p>
            <div className="d-flex justify-content-center justify-content-md-end gap-3">
              <a href="https://github.com/KnifeDad" target="_blank" rel="noopener noreferrer" className="text-light text-decoration-none">KnifeDad</a>
              <a href="https://github.com/Muhsina-de" target="_blank" rel="noopener noreferrer" className="text-light text-decoration-none">Muhsina</a>
            </div>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col className="text-center">
            <small>© {new Date().getFullYear()} BookShelf. All rights reserved.</small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer; 