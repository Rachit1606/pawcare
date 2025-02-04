import React, { useState } from 'react';
import useCart from '../../hooks/useCart';
import CartElement from '../../cartElement';
import Utility from '../../../utils/Utility';
import { useNavigate } from 'react-router-dom';
import orderHistoryLogo from '../../../assets/order-history.png';
import axios from 'axios';


const Cart = () => {
  const { cartItems, clearCart, getCartTotal } = useCart();
  const [isHovered, setIsHovered] = useState({ checkout: false, clearCart: false });
  const userEmail = localStorage.getItem('userEmail') || '';
  const navigate = useNavigate();

  const handleCheckout = async (e) => {
    e.preventDefault();
    const productDetails = cartItems.map(item => ({
      title: item.title,
      amount: item.price,
      description: item.description,
      quantity: item.quantity,
    }));

    // create a pending order and wait for payment
    const createOrderUrl = `${import.meta.env.VITE_NODE_BACKEND_URL}/order/create`
    const payload = {
      email: localStorage.getItem('userEmail'),
      amount_due: 0,
      amount_paid: Math.round(getCartTotal() + getCartTotal() * 0.15),
      currency: 'CAD',
      status: 'pending',
      transaction_id: '',
      product_details: productDetails
    }
    const headers = {
      'Content-Type': 'application/json'
    }

    try {
      const response = await axios.post(createOrderUrl, payload, { headers: headers });
      const order_id = response.data.order_id;
      await Utility.initPayment(productDetails, order_id);
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to create order');
    }
  };
  const getOrderHistory = async () => {
    // const orderHistory = await Utility.getOrderHistory();
    // console.log({ orderHistory });
    navigate('/order-history')
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'row', position: 'relative' }}>
      <div style={styles.cartContainer}>
        <h2 style={styles.header}>Cart</h2>
        <div>
          {cartItems.length === 0 && <h4>No items in cart</h4>}
          {cartItems.length > 0 && (
            <div style={styles.cartItems}>
              {cartItems.map((item, index) => (
                <CartElement key={index} cartItem={item} index={index} />
              ))}
            </div>
          )}
        </div>
        <div style={styles.summaryContainer}>
          <div style={styles.summary}>
            <div style={styles.summaryItem}>
              <span>Total (without tax):</span>
              <span style={styles.summaryValue}>CAD$ {Math.round(getCartTotal())}</span>
            </div>
            <div style={styles.summaryItem}>
              <span>Tax (GST/HST):</span>
              <span style={styles.summaryValue}>CAD$ {Math.round(getCartTotal() * 0.15)}</span>
            </div>
            <div style={styles.summaryItem}>
              <span>Total:</span>
              <span style={styles.summaryValue}>CAD$ {Math.round(getCartTotal() + getCartTotal() * 0.15)}</span>
            </div>
          </div>
        </div>
        <div style={styles.buttons}>
          <button
            style={isHovered.checkout ? { ...styles.button, ...styles.buttonHover } : styles.button}
            onClick={handleCheckout}
            onMouseEnter={() => setIsHovered({ ...isHovered, checkout: true })}
            onMouseLeave={() => setIsHovered({ ...isHovered, checkout: false })}
            disabled={cartItems.length === 0}
          >
            Checkout
          </button>
          <button
            style={isHovered.clearCart ? { ...styles.button, ...styles.buttonHover } : styles.button}
            onClick={clearCart}
            onMouseEnter={() => setIsHovered({ ...isHovered, clearCart: true })}
            onMouseLeave={() => setIsHovered({ ...isHovered, clearCart: false })}
          >
            Clear Cart
          </button>
        </div>
      </div>
      <div
        style={styles.orderHistory}
        onClick={getOrderHistory}
      >
        Order History
        <img
          src={orderHistoryLogo}
          height={40}
          width={40}
        />
      </div>
    </div>
  );
};

const styles = {
  cartContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '30px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '12px',
    maxWidth: '800px',
    margin: '30px auto',
  },
  header: {
    fontSize: '2.5em',
    marginBottom: '20px',
    color: '#3f51b5',
  },
  cartItems: {
    width: '100%',
  },
  summaryContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    borderTop: '1px solid #e0e0e0',
    paddingTop: '20px',
    marginTop: '20px',
  },
  summary: {
    fontSize: '1.2em',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  summaryItem: {
    display: 'flex',
    justifyContent: 'space-between',
    fontWeight: 'bold',
    color: '#333',
  },
  summaryValue: {
    color: '#333',
    fontWeight: 'bold',
  },
  buttons: {
    marginTop: '30px',
    display: 'flex',
    gap: '20px',
  },
  button: {
    padding: '12px 24px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1em',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
  orderHistory: {
    position: 'absolute',
    right: '2rem',
    top: '1.5rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    color: '#007BFF',
    fontSize: '16px',
    display: 'flex',
    gap: '0.5rem',
    fontSize: '1.2rem'
  },
};

export default Cart;