import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div style={{ textAlign: 'center', padding: '40px' }}>
      <h2>Page is not found...</h2>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" style={{ color: '#00c3ff', textDecoration: 'underline' }}>
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
