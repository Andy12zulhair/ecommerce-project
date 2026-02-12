// src/pages/HomePage.jsx
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="sircus-home">
      {/* HERO SECTION */}
      <section className="hero-section d-flex align-items-center justify-content-center text-center">
        <div className="hero-content">
          <div className="glitch-wrapper mb-3">
            <h1 className="hero-title" data-text="PHONE MAROS">PHONE MAROS</h1>
          </div>
          <h3 className="hero-subtitle">
            NEXT GEN <span className="text-accent mono">CONNECTIVITY</span>
          </h3>
          <p className="hero-text mt-4">
            EXPERIENCE THE FUTURE OF MOBILE TECHNOLOGY. <span className="text-accent mono">POWERED BY DATA.</span>
          </p>
          <div className="mt-5">
            <Button as={Link} to="/products" className="btn-sircus me-3">
              SHOP DEVICES
            </Button>
            <Button as={Link} to="/about" className="btn-sircus-outline">
              LEARN MORE
            </Button>
          </div>
        </div>
      </section>

      {/* CATEGORY GRID */}
      <section className="collection-section py-5">
        <Container>
          <Row className="mb-5">
            <Col className="text-center">
              <h2 className="section-title">
                AUGMENTED <span className="text-accent mono">REALITY</span><br />
                READY DEVICES
              </h2>
            </Col>
          </Row>

          <div className="grid-container">
            <div className="grid-item item-large">
              {/* Smartphone close-up */}
              <img src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Smartphone" />
              <div className="grid-text p-4">
                <h3>FLAGSHIP <span className="text-accent mono">SERIES</span></h3>
              </div>
            </div>
            <div className="grid-item item-tall">
              {/* Cyberpunk City / Tech vibe */}
              <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Tech City" />
              <div className="overlay">
                <h4 className="mono text-accent">5G SPEED</h4>
              </div>
            </div>
            <div className="grid-item">
              {/* Circuit board or chip */}
              <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Processor" />
            </div>
            <div className="grid-item item-wide">
              {/* Smartwatch or Accessories */}
              <img src="https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Smartwatch" />
              <div className="grid-text p-4 text-end">
                <h3>WEARABLE <span className="text-accent mono">ECOSYSTEM</span></h3>
              </div>
            </div>
          </div>

        </Container>
      </section>

      {/* STATS SECTION */}
      <section className="py-5 bg-black border-top border-bottom border-secondary">
        <Container>
          <Row className="text-center">
            <Col md={4} className="mb-3 mb-md-0">
              <h2 className="text-accent mono" style={{ fontSize: '3rem' }}>99.9%</h2>
              <p className="mono">UPTIME GUARANTEED</p>
            </Col>
            <Col md={4} className="mb-3 mb-md-0">
              <h2 className="text-accent mono" style={{ fontSize: '3rem' }}>24/7</h2>
              <p className="mono">TECH SUPPORT</p>
            </Col>
            <Col md={4}>
              <h2 className="text-accent mono" style={{ fontSize: '3rem' }}>1YR</h2>
              <p className="mono">WARRANTY INCLUDED</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* FOOTER BANNER */}
      <section className="footer-banner py-5 bg-darker text-center">
        <Container>
          <h1 className="footer-title">MAROS</h1>
          <p className="text-muted mono">DESIGNED FOR THE <span className="text-accent">DIGITAL AGE</span></p>
        </Container>
      </section>
    </div>
  );
};

export default HomePage;