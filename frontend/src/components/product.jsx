import React from 'react';

const Product = ({ item, onAddToCart, cartItemCount }) => {
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} style={styles.star}>★</span>);
    }

    return stars;
  };

  return (
    <div style={styles.card}>
      <div style={styles.imageContainer}>
        <img src={item.thumbnail} alt={item.title} style={styles.image} />
      </div>
      <div style={styles.details}>
        <span style={styles.title}>{item.title}</span>
        <span style={styles.description}>{item.description}</span>
        <div style={styles.priceRatingContainer}>
          <span style={styles.price}>CAD$ {item.price}</span>
          <div style={styles.rating}>{renderStars(item.rating)}</div>
        </div>
      </div>
      <button style={styles.addToCartButton} onClick={onAddToCart}>
        Add to Cart
      </button>
      {cartItemCount > 0 && (
        <div style={styles.cartItemCount}>
          Items in Cart: {cartItemCount}
        </div>
      )}
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'relative',
  },
  imageContainer: {
    backgroundColor: '#f9f9f9',
    padding: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    maxWidth: '100%',
    maxHeight: '150px',
    objectFit: 'cover',
  },
  details: {
    padding: '10px 20px',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: '1em',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '5px',
  },
  description: {
    fontSize: '0.9em',
    color: '#666',
    marginBottom: '10px',
  },
  priceRatingContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: '1em',
    fontWeight: 'bold',
    color: '#007BFF',
  },
  rating: {
    display: 'flex',
  },
  star: {
    color: '#FFD700',
    marginLeft: '2px',
  },
  addToCartButton: {
    padding: '10px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '0 0 8px 8px',
    cursor: 'pointer',
    textAlign: 'center',
    fontSize: '1em',
  },
  cartItemCount: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: '#ff6347',
    color: '#fff',
    borderRadius: '2rem',
    padding: '5px 10px',
    fontSize: '0.9em',
    fontWeight: 'bold',
  },
};

export default Product;