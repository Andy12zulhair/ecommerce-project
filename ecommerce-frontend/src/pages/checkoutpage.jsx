// src/pages/CheckoutPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/cartcontext';
import { api } from '../services/api';
import { Container, Row, Col, Form, Button, Alert, ListGroup } from 'react-bootstrap';
import './Checkout.css'; // Import custom styles

const CheckoutPage = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  // State untuk form alamat
  const [shippingAddress, setShippingAddress] = useState('');
  // State untuk loading dan error
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Logika checkout dipindahkan ke sini
  const handlePlaceOrder = async (e) => {
    e.preventDefault(); // Mencegah form submit standar

    if (!shippingAddress) {
      setError('Alamat pengiriman tidak boleh kosong.');
      return;
    }

    setLoading(true);
    setError(null);

    const orderData = {
      cartItems: cartItems,
      shippingAddress: shippingAddress // <-- Ambil dari state form
    };

    try {
      const { data } = await api.createOrder(orderData);
      setLoading(false);
      clearCart();
      // alert('Checkout berhasil! Order ID: ' + data.id); // Replaced with navigation logic
      navigate('/my-orders'); // Arahkan ke halaman "My Orders"
    } catch (err) {
      setLoading(false);
      const message = err.response?.data?.error || "Checkout gagal. Coba lagi.";
      setError(message);
    }
  };

  return (
    <Container className="mt-5 checkout-container">
      <div className="checkout-steps">
        <span className="step">CART</span> &gt; <span className="step active">INFORMATION</span> &gt; <span className="step">PAYMENT</span>
      </div>

      <h1 className="checkout-title text-center">SECURE CHECKOUT</h1>

      <Row className="justify-content-center">
        {/* Kolom Form Alamat */}
        <Col md={7} className="mb-4">
          <div className="glass-checkout-card h-100">
            <h4 className="mb-4">Shipping Information</h4>
            {error && <Alert variant="danger" className="rounded-0 bg-transparent border-danger text-danger">{error}</Alert>}

            <Form onSubmit={handlePlaceOrder}>
              <Form.Group className="mb-4" controlId="formShippingAddress">
                <Form.Label>Delivery Address</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="Enter your full shipping address..."
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  required
                  style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid #333', color: 'white' }}
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="formNote">
                <Form.Label>Order Notes (Optional)</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  placeholder="Special instructions for delivery..."
                  style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid #333', color: 'white' }}
                />
              </Form.Group>

              {/* Visual Credit Card Placeholder */}
              <div className="mb-4 p-3" style={{ border: '1px dashed #333', borderRadius: '8px' }}>
                <div className="d-flex align-items-center text-muted">
                  <i className="bi bi-credit-card me-2"></i> Payment Method: Pay on Delivery (Standard)
                </div>
              </div>

            </Form>
          </div>
        </Col>

        {/* Kolom Ringkasan Order */}
        <Col md={5}>
          <div className="glass-checkout-card">
            <h4 className="mb-4">Order Summary</h4>
            <ListGroup variant="flush">
              {cartItems.map(item => (
                <ListGroup.Item key={item.id} className="checkout-item d-flex justify-content-between align-items-center">
                  <div>
                    <div style={{ fontWeight: 'bold', color: 'white' }}>{item.name}</div>
                    <small className="text-muted">Qty: {item.quantity}</small>
                  </div>
                  <span style={{ color: 'var(--color-accent)' }}>${(item.price * item.quantity).toFixed(2)}</span>
                </ListGroup.Item>
              ))}

              <ListGroup.Item className="checkout-item d-flex justify-content-between">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </ListGroup.Item>
              <ListGroup.Item className="checkout-item d-flex justify-content-between">
                <span>Shipping</span>
                <span>Free</span>
              </ListGroup.Item>

              <ListGroup.Item className="checkout-total d-flex justify-content-between align-items-center">
                <span>TOTAL</span>
                <span style={{ color: 'var(--color-accent)', textShadow: '0 0 10px var(--color-accent)' }}>${total.toFixed(2)}</span>
              </ListGroup.Item>
            </ListGroup>

            {/* Tombol "Pay Now" */}
            <Button
              variant="primary" /* Will be overridden by btn-pay */
              onClick={handlePlaceOrder}
              className="w-100 btn-pay mt-4"
              disabled={loading || cartItems.length === 0}
            >
              {loading ? 'PROCESSING...' : `PAY $${total.toFixed(2)}`}
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CheckoutPage;