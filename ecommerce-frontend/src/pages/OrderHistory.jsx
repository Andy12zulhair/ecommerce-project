// src/pages/OrderHistory.jsx
import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Container, Spinner, Alert, ListGroup } from 'react-bootstrap';
import './OrderHistory.css';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const { data } = await api.getMyOrders();
        // Sort by newest first
        setOrders(data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
      } catch (err) {
        setError('Failed to load order history.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <Container className="text-center mt-5" style={{ height: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Spinner animation="border" variant="info" style={{ width: '3rem', height: '3rem' }} />
        <p className="mt-3 text-muted mono">SYNCING DATABASE...</p>
      </Container>
    );
  }

  if (error) {
    return <Container className="mt-5"><Alert variant="danger" className="bg-transparent text-danger border-danger">{error}</Alert></Container>;
  }

  return (
    <Container className="mt-5 history-container">
      <h1 className="history-title text-center">MY ORDERS</h1>

      {orders.length === 0 ? (
        <div className="text-center py-5">
          <h3 className="text-muted">NO ORDERS FOUND</h3>
          <p className="text-muted">Your latest tech acquisitions will appear here.</p>
        </div>
      ) : (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {orders.map(order => (
            <div key={order.id} className="order-card-dark">
              <div className="order-header">
                <div>
                  <div className="order-id">ORDER #{order.id.toString().padStart(6, '0')}</div>
                  <div className="order-date">{new Date(order.created_at).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                </div>
                <span className={`order-status-badge ${order.status === 'completed' ? 'completed' : ''}`}>
                  {order.status || 'PENDING'}
                </span>
              </div>

              <ListGroup variant="flush" className="order-items-list">
                {order.items.map(item => (
                  <ListGroup.Item key={item.product?.id || Math.random()}>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <div style={{ width: '40px', height: '40px', background: '#222', borderRadius: '4px', marginRight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <i className="bi bi-box-seam text-muted"></i>
                        </div>
                        <div>
                          <div className="text-white">{item.product?.name || 'Unknown Product'}</div>
                          <small className="text-muted">Qty: {item.quantity}</small>
                        </div>
                      </div>
                      <div className="text-white font-monospace">
                        ${(item.price).toFixed(2)}
                      </div>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>

              <div className="order-footer">
                TOTAL: <span style={{ color: 'var(--color-accent)' }}>${order.total}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </Container>
  );
};

export default OrderHistory;