import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { useCart } from '../context/cartcontext';
import './Navbar.css';

const AppNavbar = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();
  const { cartItems } = useCart();

  const handleLogoutClick = () => {
    onLogout();
    navigate('/login');
  };

  const totalItemsInCart = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <Navbar
      expand="lg"
      fixed="top"
      className="sircus-navbar"
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="sircus-brand">
          MAROS
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="bg-secondary" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link as={Link} to="/" className="sircus-link">Home</Nav.Link>
            <Nav.Link as={Link} to="/products" className="sircus-link">Shop</Nav.Link>
            <Nav.Link as={Link} to="/about" className="sircus-link">About</Nav.Link>
            <Nav.Link as={Link} to="/contact" className="sircus-link">Contact</Nav.Link>
          </Nav>
          <Nav>
            {isLoggedIn ? (
              <>
                <Nav.Link as={Link} to="/cart" className="sircus-link position-relative me-3">
                  CART
                  {totalItemsInCart > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-danger" style={{ fontSize: '0.6rem' }}>
                      {totalItemsInCart}
                    </span>
                  )}
                </Nav.Link>

                <NavDropdown title="ACCOUNT" id="basic-nav-dropdown" align="end" className="sircus-link">
                  <NavDropdown.Item as={Link} to="/my-orders">
                    My Orders
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogoutClick} className="text-danger">
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="sircus-link">Login</Nav.Link>
                <Nav.Link as={Link} to="/register" className="sircus-link">Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;