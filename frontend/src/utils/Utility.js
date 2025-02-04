import { loadStripe } from '@stripe/stripe-js';

const headers = {
  'Content-Type': 'application/json',
};

class Utility {
  static initPayment = async (productDetails, order_id) => {
    const stripe = await loadStripe(String(import.meta.env.VITE_PUBLIC_KEY));

    const body = {
      product: productDetails,
      order_id: order_id
    };

    const response = await fetch(`${import.meta.env.VITE_NODE_BACKEND_URL}/api/create-checkout-session`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    const { session = {} } = await response.json();

    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.error(result.error);
    }
  };

  static getOrderHistory = (email = '') => {
    const url = `${import.meta.env.VITE_NODE_BACKEND_URL}/order/fetch-all/${email}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        return data;
      });
  }
}

export default Utility;
