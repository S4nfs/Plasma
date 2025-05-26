import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header style={styles.header}>
      <div style={styles.titleContainer}>
        <span style={styles.title}>BYOL Academy</span>
      </div>
      <nav style={styles.nav}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/contact" style={styles.link}>Contact</Link> {/* Placeholder route */}
      </nav>
    </header>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#1e1e1e',
    borderBottom: '1px solid #333',
    color: '#fff',
    position: 'sticky',
    top: 0,
    zIndex: 1000
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  title: {
    fontSize: '1.4rem',
    fontWeight: 'bold',
    color: '#7B61FF'
  },
  nav: {
    display: 'flex',
    gap: '1rem'
  },
  link: {
    color: '#ffffff',
    textDecoration: 'none',
    fontWeight: '500',
    fontSize: '1rem',
    transition: 'color 0.3s ease',
    cursor: 'pointer'
  }
};

export default Header;
