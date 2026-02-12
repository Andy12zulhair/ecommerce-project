// src/pages/Products.jsx
import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import ProductCard from '../components/ProductCard';
import { Container, Row, Col, Alert, Spinner, Form, Button } from 'react-bootstrap';
import './Products.css';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Filter & Search State
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    // Pagination State
    const [nextPage, setNextPage] = useState(null);
    const [prevPage, setPrevPage] = useState(null);
    const [currentPageUrl, setCurrentPageUrl] = useState(null);

    // Fetch Categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data } = await api.getCategories();
                const categoryList = data.results || data || [];
                setCategories(Array.isArray(categoryList) ? categoryList : []);
            } catch (err) {
                console.error("Gagal mengambil kategori:", err);
                setCategories([]);
            }
        };
        fetchCategories();
    }, []);

    // Fetch Products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError(null);

                let apiArg;
                if (currentPageUrl) {
                    apiArg = currentPageUrl;
                } else {
                    const params = {};
                    if (searchTerm) params.search = searchTerm;
                    if (selectedCategory) params.category = selectedCategory;
                    apiArg = params;
                }

                const { data } = await api.getProducts(apiArg);

                const results = data.results || [];
                setProducts(results);
                setNextPage(data.next);
                setPrevPage(data.previous);

            } catch (err) {
                console.error("Fetch Products Error:", err);
                if (err.response && err.response.status === 401) {
                    setError('SESSION_EXPIRED');
                } else {
                    setError('Gagal memuat produk. Coba refresh halaman.');
                }
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [searchTerm, selectedCategory, currentPageUrl]);

    const handleFixSession = () => {
        localStorage.removeItem('token');
        window.location.reload();
    };

    const handleNext = () => {
        if (nextPage) setCurrentPageUrl(nextPage);
        window.scrollTo(0, 0);
    };

    const handlePrev = () => {
        if (prevPage) setCurrentPageUrl(prevPage);
        window.scrollTo(0, 0);
    };

    if (loading) {
        return (
            <Container className="shop-container text-center pt-5">
                <br /><br /><br />
                <Spinner animation="border" variant="light" style={{ width: '3rem', height: '3rem' }} />
                <p className="mt-4 text-white" style={{ letterSpacing: '2px' }}>LOADING COLLECTION...</p>
            </Container>
        );
    }

    if (error) {
        return (
            <div style={{ padding: '150px 20px', textAlign: 'center', color: 'white' }}>
                <h2 style={{ color: '#ff4444', marginBottom: '20px' }}>ACCESS PROBLEM</h2>

                <div style={{ border: '1px solid #ff4444', padding: '30px', maxWidth: '500px', margin: '0 auto', borderRadius: '10px' }}>
                    <p style={{ fontSize: '1.2rem', marginBottom: '20px' }}>
                        {error === 'SESSION_EXPIRED'
                            ? "Sesi login Anda telah berakhir."
                            : "Terjadi kesalahan saat memuat data."}
                    </p>

                    <p style={{ color: '#aaa', fontSize: '0.9rem' }}>
                        Status: {error === 'SESSION_EXPIRED' ? "401 Unauthorized" : error}
                    </p>

                    <button
                        onClick={handleFixSession}
                        style={{
                            padding: '12px 25px',
                            backgroundColor: '#ff4444',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            marginTop: '15px'
                        }}
                    >
                        REFRESH SESSION (LOGOUT)
                    </button>
                </div>
            </div>
        );
    }

    return (
        <Container className="shop-container">
            <h1 className="mb-5 text-center shop-title">COLLECTION</h1>

            {/* SEARCH TOOLBAR */}
            <div className="shop-toolbar">
                <Form>
                    <Row>
                        {/* SEARCH INPUT */}
                        <Col md={8} className="mb-3 mb-md-0">
                            <Form.Control
                                type="text"
                                placeholder="SEARCH PRODUCTS..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="shop-search-input"
                            />
                        </Col>
                        {/* CATEGORY SELECT */}
                        <Col md={4}>
                            <Form.Select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="shop-category-select"
                            >
                                <option value="">ALL CATEGORIES</option>
                                {Array.isArray(categories) && categories.map(category => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Col>
                    </Row>
                </Form>
            </div>

            {/* PRODUCT GRID */}
            <Row>
                {products.length === 0 ? (
                    <Col>
                        <div className="shop-empty-alert">
                            <h4>NO PRODUCTS FOUND</h4>
                            <p>Try adjusting your search or filters.</p>
                        </div>
                    </Col>
                ) : (
                    Array.isArray(products) && products.map(product => (
                        <Col key={product.id} xs={12} md={6} lg={4} xl={3} className="product-col d-flex mb-4">
                            <ProductCard product={product} />
                        </Col>
                    ))
                )}
            </Row>

            {/* PAGINATION CONTROLS */}
            <div className="d-flex justify-content-center mt-5 gap-3">
                <button
                    className="btn-tech-outline"
                    onClick={handlePrev}
                    disabled={!prevPage}
                    style={{ opacity: !prevPage ? 0.5 : 1 }}
                >
                    PREV
                </button>
                <button
                    className="btn-tech-outline"
                    onClick={handleNext}
                    disabled={!nextPage}
                    style={{ opacity: !nextPage ? 0.5 : 1 }}
                >
                    NEXT
                </button>
            </div>
        </Container>
    );
};

export default Products;