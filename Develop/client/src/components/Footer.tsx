import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import bookshelf from '../assets/bookshelf.png';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-3">
      <Container>
        <Row className="align-items-center">
          <Col md={4} className="d-flex align-items-center mb-2 mb-md-0">
            <img src={bookshelf} alt="BookShelf Logo" height="25" className="me-2" />
            <span>BookShelf</span>
          </Col>
          <Col md={4} className="text-center mb-2 mb-md-0">
            <div className="d-flex justify-content-center gap-3">
              <Link to="/" className="text-light text-decoration-none">Search</Link>
              <Link to="/saved" className="text-light text-decoration-none">Saved</Link>
            </div>
          </Col>
          <Col md={4} className="text-end">
            <small>Made with ❤️ by <a href="https://github.com/KnifeDad" target="_blank" rel="noopener noreferrer" className="text-light text-decoration-none">KnifeDad</a> & <a href="https://github.com/Muhsina-de" target="_blank" rel="noopener noreferrer" className="text-light text-decoration-none">Muhsina</a></small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer; 