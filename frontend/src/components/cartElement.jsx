import React from 'react';
import useCart from '../components/hooks/useCart';

const CartElement = ({ cartItem, index }) => {
  const { addItem, removeItem } = useCart();

  return (
    <div key={index} style={styles.cartElement}>
      <div style={styles.imageContainer}>
        <img src={cartItem.thumbnail} alt={cartItem.title} style={styles.image} />
      </div>
      <div style={styles.details}>
        <span style={styles.title}>{cartItem.title}</span>
        <span style={styles.price}>CAD$: {cartItem.price}</span>
      </div>
      <div style={styles.controls}>
        <button style={styles.button} onClick={() => removeItem(cartItem)}>-</button>
        <span style={styles.quantity}>{cartItem.quantity}</span>
        <button style={styles.button} onClick={() => addItem(cartItem)}>+</button>
      </div>
      <span style={styles.totalPrice}>CAD$: {Math.round(cartItem.price * cartItem.quantity)}</span>
    </div>
  );
};

const styles = {
  cartElement: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 0',
    borderBottom: '1px solid #e0e0e0',
  },
  imageContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    padding: '10px',
  },
  image: {
    width: '80px',
    height: 'auto',
    borderRadius: '8px',
  },
  details: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '20px',
  },
  title: {
    fontSize: '1em',
    fontWeight: 'bold',
    marginBottom: '5px',
    color: '#333',
  },
  price: {
    fontSize: '0.9em',
    fontWeight: 'bold',
    color: '#777',
    marginTop: '10px',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginLeft: '20px',
  },
  button: {
    border: '1px solid #ccc',
    backgroundColor: '#f0f0f0',
    color: '#333',
    padding: '5px 10px',
    cursor: 'pointer',
    borderRadius: '4px',
  },
  quantity: {
    fontSize: '1em',
    fontWeight: 'bold',
    margin: '0 10px',
  },
  totalPrice: {
    fontSize: '1em',
    fontWeight: 'bold',
    color: '#333',
    marginLeft: '20px',
  },
};

export default CartElement;