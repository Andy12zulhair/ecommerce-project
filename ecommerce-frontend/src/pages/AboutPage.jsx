// src/pages/AboutPage.jsx
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-page-wrapper">

      {/* 1. HERO SECTION */}
      <section className="about-hero-centered">
        <Container>
          <h1 className="section-title-large">About MAROS</h1>
          <p className="section-subtitle">
            Discover the story behind our journey, the principles that guide us, and how we're dedicated to empowering your digital lifestyle.
          </p>

          <div className="hero-image-container">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
              alt="Team collaboration"
              className="hero-img"
            />
          </div>
        </Container>
      </section>

      {/* 2. STATS SECTION */}
      <section className="stats-section">
        <Container>
          <Row className="text-center">
            <Col md={3} className="stat-item mb-4 mb-md-0">
              <h2>50K+</h2>
              <p>Happy Customers</p>
            </Col>
            <Col md={3} className="stat-item mb-4 mb-md-0">
              <h2>05M+</h2>
              <p>Devices Sold</p>
            </Col>
            <Col md={3} className="stat-item mb-4 mb-md-0">
              <h2>98%</h2>
              <p>Positive Reviews</p>
            </Col>
            <Col md={3} className="stat-item">
              <h2>15+</h2>
              <p>Awards Won</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* 3. PRODUCT SHOWCASE SECTION (Was Team Section) */}
      <section className="about-section">
        <Container>
          <div className="team-header">
            <h2 className="section-title-large" style={{ fontSize: '2.5rem' }}>Our Innovations</h2>
            <p className="section-subtitle">
              Explore the cutting-edge technology that defines the MAROS ecosystem. Designed for performance, built for the future.
            </p>
          </div>

          <Row>
            {/* Product 1 */}
            <Col md={4} className="mb-4">
              <div className="team-card">
                <div className="team-img-wrapper">
                  <img src="https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=600&q=80" alt="MAROS X1" className="team-img" />
                </div>
                <div className="team-info">
                  <h4 className="team-name">MAROS X1</h4>
                  <span className="team-role">Flagship Series</span>
                </div>
              </div>
            </Col>
            {/* Product 2 */}
            <Col md={4} className="mb-4">
              <div className="team-card">
                <div className="team-img-wrapper">
                  <img src="https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=600&q=80" alt="MAROS Air" className="team-img" />
                </div>
                <div className="team-info">
                  <h4 className="team-name">MAROS Air</h4>
                  <span className="team-role">Ultra Slim</span>
                </div>
              </div>
            </Col>
            {/* Product 3 */}
            <Col md={4} className="mb-4">
              <div className="team-card">
                <div className="team-img-wrapper">
                  <img src="https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=600&q=80" alt="MAROS Pro" className="team-img" />
                </div>
                <div className="team-info">
                  <h4 className="team-name">MAROS Pro</h4>
                  <span className="team-role">Performance Beast</span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* 4. STORY SECTION */}
      <section className="about-section" style={{ background: '#080808' }}>
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="mb-5 mb-md-0">
              <div className="story-content">
                <h2>Our Story</h2>
                <p>
                  Every great solution begins with a problem. We noticed businesses struggling to find reliable, high-performance tech that could keep up with the pace of modern innovation.
                </p>
                <p>
                  Founded in 2025, MAROS set out to create a platform that simplifies access to cutting-edge electronics. We believe in transparency, quality, and the power of technology to transform lives.
                </p>
                <Button className="btn-sircus rounded-pill px-4 mt-3">Read More</Button>
              </div>
            </Col>
            <Col md={6}>
              <div className="story-img-container">
                <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" className="story-img large" alt="Meeting" />
                <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" className="story-img" alt="Working" />
                <img src="https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" className="story-img" alt="Code" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* 5. CONTACT SECTION */}
      <section className="about-section pt-0">
        <Container>
          <div className="contact-grid">
            <div className="contact-card">
              <div className="contact-icon">
                <i className="bi bi-envelope"></i>
              </div>
              <div className="contact-text">
                <h5>Email</h5>
                <p>support@maros.com</p>
              </div>
            </div>
            <div className="contact-card">
              <div className="contact-icon">
                <i className="bi bi-telephone"></i>
              </div>
              <div className="contact-text">
                <h5>Phone</h5>
                <p>+62 123 4567 890</p>
              </div>
            </div>
            <div className="contact-card">
              <div className="contact-icon">
                <i className="bi bi-geo-alt"></i>
              </div>
              <div className="contact-text">
                <h5>Address</h5>
                <p>Tech City, Jakarta, ID</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

    </div>
  );
};

export default React.memo(AboutPage);