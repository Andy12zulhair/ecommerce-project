// pages/Cart.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/cartcontext';
import { Container, Row, Col, ListGroup, Button, Card, Alert } from 'react-bootstrap';

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();
  const navigate = useNavigate();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <Container className="mt-5 text-center" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="p-5" style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '10px', backdropFilter: 'blur(10px)' }}>
          <h1 className="mb-4" style={{ fontSize: '4rem' }}>🛒</h1>
          <h2 className="text-white mb-3" style={{ fontFamily: 'var(--font-heading)' }}>YOUR CART IS EMPTY</h2>
          <p className="text-muted mb-4 mono">Looks like you haven't added any tech gear yet.</p>
          <Button as={Link} to="/products" className="btn-sircus px-5 py-2 rounded-pill">
            BROWSE DEVICES
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="mt-5 mb-5">
      <h2 className="mb-4 text-white" style={{ fontFamily: 'var(--font-heading)', borderLeft: '4px solid var(--color-accent)', paddingLeft: '15px' }}>
        SHOPPING <span className="text-accent">CART</span>
      </h2>

      <Row>
        {/* Kolom Daftar Item */}
        <Col md={8}>
          <div className="d-flex flex-column gap-3">
            {cartItems.map(item => (
              <div key={item.id} className="p-3 d-flex align-items-center" style={{ background: '#0a0a0a', border: '1px solid #333', borderRadius: '8px' }}>
                <div style={{ width: '100px', height: '100px', overflow: 'hidden', borderRadius: '6px', flexShrink: 0 }}>
                  <img
                    src={item.image || "https://via.placeholder.com/100"}
                    alt={item.name}
                    className="w-100 h-100"
                    style={{ objectFit: 'cover' }}
                  />
                </div>

                <div className="ms-3 flex-grow-1">
                  <h5 className="text-white mb-1" style={{ fontFamily: 'var(--font-mono)' }}>{item.name}</h5>
                  <p className="text-accent mb-0 fw-bold">${item.price}</p>
                </div>

                <div className="text-center mx-3">
                  <span className="text-muted small d-block mb-1">QTY</span>
                  <span className="text-white fw-bold bg-dark px-3 py-1 rounded">{item.quantity}</span>
                </div>

                <div>
                  <Button
                    variant="link"
                    className="text-danger p-0"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <i className="bi bi-trash"></i> Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Col>

        {/* Kolom Ringkasan Total */}
        <Col md={4} className="mt-4 mt-md-0">
          <Card className="bg-darker border-secondary text-white">
            <Card.Body>
              <Card.Title className="mono mb-4 border-bottom border-secondary pb-2">ORDER SUMMARY</Card.Title>
              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">Subtotal</span>
                <span className="mono">${total.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">Shipping</span>
                <span className="text-accent mono">FREE</span>
              </div>
              <div className="d-flex justify-content-between mb-4 pt-3 border-top border-secondary">
                <span className="fw-bold">TOTAL</span>
                <span className="fw-bold text-accent fs-4">${total.toFixed(2)}</span>
              </div>

              <Button
                className="w-100 btn-sircus py-3 fw-bold rounded-0"
                onClick={() => navigate('/checkout')}
              >
                PROCEED TO CHECKOUT
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;