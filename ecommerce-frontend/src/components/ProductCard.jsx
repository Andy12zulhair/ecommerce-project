// components/ProductCard.jsx
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { useState } from 'react';

const ProductCard = ({ product }) => {
  const [hover, setHover] = useState(false);

  return (
    <Card
      className="h-100 bg-transparent text-white"
      style={{
        border: hover ? '1px solid var(--color-accent)' : '1px solid #333',
        boxShadow: hover ? '0 0 15px rgba(0, 243, 255, 0.1)' : 'none',
        transition: 'all 0.3s ease'
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div style={{ position: 'relative', overflow: 'hidden', height: '300px' }}>
        <Card.Img
          variant="top"
          src={product.image || "https://placehold.co/300x400/1a1a1a/00f3ff?text=MAROS+TECH"}
          alt={product.name}
          style={{
            height: '100%',
            objectFit: 'cover',
            filter: hover ? 'grayscale(0%)' : 'grayscale(100%)',
            transition: 'all 0.5s ease',
            transform: hover ? 'scale(1.05)' : 'scale(1)'
          }}
        />
        {product.stock === 0 && (
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            border: '1px solid red'
          }}>
            <span className="h4 text-danger font-mono" style={{ letterSpacing: '2px' }}>OFFLINE</span>
          </div>
        )}
      </div>

      <Card.Body className="d-flex flex-column p-4">
        <div className="mb-3">
          <small className="text-accent font-mono" style={{ fontSize: '0.8rem' }}>
            {product?.category?.name?.toUpperCase() || 'UNCATEGORIZED'}
          </small>
        </div>

        <Card.Title style={{ fontFamily: 'var(--font-heading)', letterSpacing: '1px', fontSize: '1.4rem' }}>
          {product.name}
        </Card.Title>

        <div className="mt-auto d-flex justify-content-between align-items-center pt-3 border-top border-secondary">
          <h4 className="text-white mb-0 font-mono">${product.price}</h4>

          <Button
            as={Link}
            to={`/product/${product.id}`}
            variant="link"
            className="text-white p-0 text-decoration-none font-mono"
            style={{ fontSize: '0.9rem' }}
            disabled={product.stock === 0}
          >
            {product.stock > 0 ? 'DETAILS >' : 'N/A'}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;