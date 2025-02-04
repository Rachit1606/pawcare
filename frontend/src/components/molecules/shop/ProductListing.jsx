import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import Product from '../../product';
import axios from 'axios';
import Utility from '../../../utils/Utility';
import ReactSlider from 'react-slider';
import useCart from '../../hooks/useCart';
import Star from '../../atoms/Star'

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [minRating, setMinRating] = useState(0);

  const cancelRef = useRef(null);
  const { addItem, cartItems } = useCart();

  const MIN_PRICE_KEY = "minPrice";
  const MAX_PRICE_KEY = "maxPrice";
  const MIN_RATING_KEY = "minRating";

  useEffect(() => {
    const getProducts = async () => {
      const listingEndpoint = `${import.meta.env.VITE_BACKEND_URL}/api/shopping`;
      const headers = {
        "Content-type": 'application/json'
      };

      cancelRef.current?.abort();
      cancelRef.current = new AbortController();

      const response = await axios.get(listingEndpoint, { headers: headers, signal: cancelRef.current?.signal })
        .then((response) => {
          return response.data;
        })
        .catch(err => {
          console.log(err);
        });

      setProducts(response);
      setFilteredProducts(response);
    };

    getProducts();
  }, []);

  // handling filters
  const setFilters = (key, value) => {
    if (Number.isNaN(Number(value))) {
      return;
    }

    setSearchParams(prevParams => {
      if (value !== undefined && value !== null && value !== '') {
        prevParams.set(key, value);
      } else {
        prevParams.delete(key);
      }
      return prevParams;
    });
  };

  const applyFilters = () => {
    const minPriceStr = searchParams.get(MIN_PRICE_KEY);
    const maxPriceStr = searchParams.get(MAX_PRICE_KEY);
    const minRatingStr = searchParams.get(MIN_RATING_KEY);

    // if no filters are applied
    if (!minPriceStr && !maxPriceStr && !minRatingStr) {
      return;
    }

    const minPrice = !minPriceStr ? 0 : Number(minPriceStr);
    const maxPrice = !maxPriceStr ? Number.MAX_SAFE_INTEGER : Number(maxPriceStr);
    const minRating = !minRatingStr ? 0 : Number(minRatingStr);

    // should not filter based negative or minPrice > maxPrice
    if (Number.isNaN(minPrice)
      || Number.isNaN(maxPrice)
      || Number.isNaN(minRating)
      || minPrice < 0
      || maxPrice < 0
      || minRating < 0
      || minPrice > maxPrice) {
      return;
    }

    setFilteredProducts(
      products.filter(item => {
        return minPrice <= item.price && maxPrice >= item.price && minRating <= item.rating;
      })
    );
  };

  const clearFilters = () => {
    setSearchParams({});
    setFilteredProducts(products);
    setPriceRange([0, 300]);
    setMinRating(0);
  };

  const handleAddToCart = (item) => {
    addItem(item);
  };

  const getCartItemCount = (itemId) => {
    const cartItem = cartItems.find(item => item.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  return (
    <div style={styles.container}>
      <div style={styles.title}>
        Shop
      </div>
      <div style={styles.filters}>
        <div style={styles.sliderContainer}>
          <label style={{ textAlign: 'center', paddingBottom: '0.5rem' }}>Price Range</label>
          <ReactSlider
            value={priceRange}
            onChange={(newValue) => {
              setPriceRange(newValue);
              setFilters(MIN_PRICE_KEY, newValue[0]);
              setFilters(MAX_PRICE_KEY, newValue[1]);
              applyFilters();
            }}
            min={0}
            max={300}
            step={10}
            renderThumb={(props, state) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  height: '17px',
                  width: '17px',
                  backgroundColor: '#007BFF',
                  borderRadius: '50%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: '#fff',
                  fontSize: '12px',
                  top: '-0.3rem',
                }}
              />
            )}
            renderTrack={(props, state) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  height: '8px',
                  backgroundColor: state.index === 1 ? '#007BFF' : '#ccc',
                  borderRadius: '4px',
                }}
              />
            )}
          />
          <div style={styles.sliderValuesDisplay}>
            <span style={{ marginTop: '0.5rem' }}>${priceRange[0]}</span>
            <span style={{ marginTop: '0.5rem' }}>${priceRange[1]}</span>
          </div>
        </div>

        <div style={styles.filterGroup}>
          <label style={{ textAlign: 'center', paddingBottom: '0.2rem' }}>Rating</label>
          <div>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                selected={star <= minRating}
                onClick={() => {
                  setMinRating(star);
                  setFilters(MIN_RATING_KEY, star);
                  applyFilters();
                }}
              />
            ))}
          </div>
        </div>

        <div style={styles.buttonGroup}>
          {/* <button onClick={applyFilters} style={styles.button}>Filter</button> */}
          <button onClick={clearFilters} style={styles.button}>Clear all filters</button>
        </div>

      </div>
      
      {
        (!filteredProducts || filteredProducts.length === 0) &&
        <h3>No results found!</h3>
      }
      {
        (filteredProducts.length > 0) &&
        <div style={styles.productGrid}>
          {
            filteredProducts.map((product, index) => {
              return <Product key={index} item={product} onAddToCart={() => handleAddToCart(product)} cartItemCount={getCartItemCount(product.id)} />
            })
          }
        </div>
      }
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    textAlign: 'center',
    fontSize: '2em',
    marginBottom: '20px',
    color: '#3f51b5',
    fontWeight: '700',
  },
  filters: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
    flexWrap: 'wrap',
  },
  filterGroup: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: '20px',
  },
  sliderContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: '20px',
    width: '10rem',
  },

  input: {
    marginTop: '5px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginBottom: '10px',
  },
  buttonGroup: {
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    padding: '10px 20px',
    marginRight: '10px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1em',
  },
  productGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px',
  },
  sliderValuesDisplay: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '10px',
    fontSize: '14px',
    color: '#333',
    fontWeight: 'bold',
  },
  clearLink: {
    marginTop: '15px',
    color: '#007BFF',
    cursor: 'pointer',
    textDecoration: 'underline',
    fontSize: '14px',
  },
};

export default ProductListing;