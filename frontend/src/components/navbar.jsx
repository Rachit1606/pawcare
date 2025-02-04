import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, logout } from '../components/molecules/auth/firebase';
import styles from './navbar.module.scss';
import useCart from '../components/hooks/useCart'
import { useLocation } from 'react-router-dom'

const Navbar = () => {
  const [user, loading, error] = useAuthState(auth);
  const { getTotalItems } = useCart();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.navbar__title}>PawCare</Link>
      <div className={styles.navbar__links}>
        <a href="/" className={styles.navbar__link}>Home</a>
        <Link to="/contact" className={styles.navbar__link}>Contact</Link>
        <Link to="/about" className={styles.navbar__link}>About Us</Link>
        <Link to="/brandpartners" className={styles.navbar__link}>Brand Partners</Link>
        <Link to="/shop/products" className={styles.navbar__link}>Shop</Link>
        {
          currentPath.includes("/shop/") ? <Link to="/shop/cart" className={styles.navbar__link}>View cart {getTotalItems() > 0 ? <span>({getTotalItems()})</span> : null}</Link>
            : null
        }
        {user && (
          <Link to="/profile" className={styles.navbar__link}>Profile</Link>
        )}
        {user && (
          <button onClick={logout} className={`${styles.navbar__link} ${styles.logout}`}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
