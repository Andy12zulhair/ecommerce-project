// pages/ProductDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import { useCart } from '../context/cartcontext';
import { Container, Row, Col, Image, Button, Spinner, Alert } from 'react-bootstrap';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data } = await api.getProduct(id);
        setProduct(data);
      } catch (err) {
        setError(`Produk tidak ditemukan atau terjadi error.`);
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <Container className="text-center mt-5 pt-5" style={{ height: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Spinner animation="grow" variant="info" />
        <p className="mt-3 mono" style={{ letterSpacing: '3px' }}>LOADING SPECIFICATIONS...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5 pt-5">
        <Alert variant="danger" className="rounded-0 bg-transparent text-danger border-danger">{error} <Link to="/" className="text-white fw-bold">RETURN HOME</Link></Alert>
      </Container>
    );
  }

  if (!product) return null;

  return (
    <div className="product-detail-container">
      <Container>
        <Row className="align-items-start">
          {/* Kolom Gambar (Cinematic Hero) */}
          <Col md={7} className="mb-5 mb-md-0">
            <div className="product-hero-image-box sticky-top" style={{ top: '100px', zIndex: '10' }}>
              <Image
                src={product.image || "https://via.placeholder.com/800x600"}
                alt={product.name}
                className="product-hero-img"
              />
            </div>
          </Col>

          {/* Kolom Detail (Sticky Info) */}
          <Col md={5} className="ps-md-5">
            <span className="product-category-badge">
              {product.category.name} / SERIES {product.id}
            </span>

            <h1 className="product-title-large">{product.name}</h1>
            <div className="product-price-large">${product.price}</div>

            <p className="product-description">
              {product.description}
            </p>

            {/* Artificial Tech Specs Grid (Mock Data for visual) */}
            <div className="tech-specs-grid">
              <div className="spec-item">
                <span className="spec-label">PROCESSOR</span>
                <span className="spec-value">M-Core X1</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">BATTERY</span>
                <span className="spec-value">5000 mAh</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">DISPLAY</span>
                <span className="spec-value">120Hz OLED</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">WARRANTY</span>
                <span className="spec-value">2 Years</span>
              </div>
            </div>

            <div className="d-grid">
              <Button
                className="btn-add-cart"
                onClick={() => addToCart(product)}
                disabled={product.stock === 0}
              >
                {product.stock > 0 ? 'ADD TO CART' : 'SOLD OUT'}
              </Button>
            </div>

            <div className="stock-status">
              <strong>AVAILABILITY:</strong> {product.stock > 0 ? `${product.stock} UNITS IN STOCK` : 'OUT OF STOCK'}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProductDetail;