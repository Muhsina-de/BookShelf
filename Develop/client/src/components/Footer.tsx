import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import bookshelf from '../assets/bookshelf.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-dark text-light py-2 footer-decorative">
      <div className="footer-shape-1"></div>
      <div className="footer-shape-2"></div>
      <div className="footer-shape-3"></div>
      <div className="footer-shape-4"></div>
      <div className="footer-shape-5"></div>
      <div className="footer-shape-6"></div>
      <div className="footer-shape-7"></div>
      <div className="footer-shape-8"></div>
      <div className="footer-shape-9"></div>
      <div className="footer-shape-10"></div>
      <div className="footer-shape-11"></div>
      <Container>
        <Row className="align-items-center justify-content-between g-0">
          <Col xs={12} md={3} className="d-flex align-items-center">
            <img src={bookshelf} alt="BookShelf Logo" height="35" className="me-2" />
            <span className="fs-5">BookShelf</span>
          </Col>
          <Col xs={12} md={3} className="text-center">
            <div className="d-flex justify-content-center gap-4">
              <Link to="/" className="text-light text-decoration-none fs-5">Search</Link>
              <Link to="/saved" className="text-light text-decoration-none fs-5">Saved</Link>
            </div>
          </Col>
          <Col xs={12} md={3} className="text-center">
            <span className="fs-5">Made with ❤️ by <a href="https://github.com/KnifeDad" target="_blank" rel="noopener noreferrer" className="text-light text-decoration-none">KnifeDad</a> & <a href="https://github.com/Muhsina-de" target="_blank" rel="noopener noreferrer" className="text-light text-decoration-none">Muhsina</a></span>
          </Col>
          <Col xs={12} md={3} className="text-center text-md-end">
            <span className="fs-5">© {currentYear} BookShelf</span>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer; 