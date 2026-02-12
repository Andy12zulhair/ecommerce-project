// src/pages/ContactPage.jsx
import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './Contact.css';

const ContactPage = () => {
  return (
    <Container className="contact-container">
      <Row className="justify-content-center">
        <Col lg={10}>
          <Row>
            {/* Left Side: Form */}
            <Col md={7} className="mb-5 mb-md-0">
              <h1 className="contact-title">CONTACT SUPPORT</h1>
              <p className="contact-subtitle">
                SYSTEMS ONLINE. TRANSMIT YOUR QUERY TO MAROS HQ.
              </p>

              <div className="contact-glass-panel">
                <Form>
                  <Form.Group controlId="formName">
                    <Form.Control type="text" placeholder="AGENT NAME / ID" className="contact-form-control" />
                  </Form.Group>
                  <Form.Group controlId="formEmail">
                    <Form.Control type="email" placeholder="COMMUNICATION CHANNEL (EMAIL)" className="contact-form-control" />
                  </Form.Group>
                  <Form.Group controlId="formSubject">
                    <Form.Control type="text" placeholder="SUBJECT DESIGNATION" className="contact-form-control" />
                  </Form.Group>
                  <Form.Group controlId="formMessage">
                    <Form.Control as="textarea" rows={5} placeholder="TRANSMISSION CONTENT..." className="contact-form-control" />
                  </Form.Group>

                  <Button className="btn-send-message" type="submit">
                    INITIATE TRANSMISSION
                  </Button>
                </Form>
              </div>
            </Col>

            {/* Right Side: Info */}
            <Col md={5} className="ps-md-5 pt-5">
              <div className="location-box">
                <h3 className="location-title">HEADQUARTERS</h3>
                <div className="location-detail">
                  <i className="bi bi-geo-alt"></i>
                  <span>NEO JAKARTA, SECTOR 7<br />CYBER DISTRICT, ID 10110</span>
                </div>
                <div className="location-detail mt-4">
                  <i className="bi bi-envelope"></i>
                  <span>CORE@MAROS.TECH</span>
                </div>
                <div className="location-detail mt-2">
                  <i className="bi bi-telephone"></i>
                  <span>+62 888-TECH-MAROS</span>
                </div>
              </div>

              <div className="mt-5 p-4" style={{ background: 'rgba(0, 243, 255, 0.05)', borderLeft: '2px solid var(--color-accent)' }}>
                <h5 style={{ fontFamily: 'var(--font-heading)', letterSpacing: '1px' }}>LIVE STATUS</h5>
                <div className="d-flex align-items-center mt-3">
                  <span style={{ width: '10px', height: '10px', background: '#0f0', borderRadius: '50%', marginRight: '10px', boxShadow: '0 0 10px #0f0' }}></span>
                  <span className="font-monospace small">SUPPORT AGENTS: ONLINE</span>
                </div>
                <div className="d-flex align-items-center mt-2">
                  <span style={{ width: '10px', height: '10px', background: '#0f0', borderRadius: '50%', marginRight: '10px', boxShadow: '0 0 10px #0f0' }}></span>
                  <span className="font-monospace small">SERVER LATENCY: 12ms</span>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactPage;