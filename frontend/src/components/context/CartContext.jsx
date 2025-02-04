import { createContext, useState, useEffect } from "react";

export const CartContext = createContext({});

const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []);

    useEffect(() => {
        const cartFromStorage = localStorage.setItem('cart', JSON.stringify(cartItems));

        if (cartFromStorage) {
            setCartItems(JSON.parse(localStorage.getItem('cart')));
        }
    }, [cartItems]);

    const addItem = (newItem) => {
        const isPresent = cartItems.find((item) => item.id === newItem.id);
        if (!isPresent) {
            setCartItems([...cartItems, { ...newItem, quantity: 1 }]);
        } else {
            setCartItems(cartItems.map((item) => {
                return item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item;
            }));
        }
    }

    const removeItem = (removeItem) => {
        const itemInCart = cartItems.find((item) => item.id === removeItem.id);

        if (itemInCart.quantity === 1) {
            setCartItems(cartItems.filter((item) => item.id !== itemInCart.id));
        } else {
            setCartItems(cartItems.map((item) => {
                return item.id === itemInCart.id ? { ...item, quantity: item.quantity - 1 } : item;
            }));
        }
    }

    const clearCart = () => {
        setCartItems([]);
    }

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    }

    const getTotalItems = () => {
        return cartItems.reduce((totalCount, item) => totalCount + item.quantity, 0);
    }

    const getItemCount = (currItem) => {
        const item = cartItems.find((itemInCart) => itemInCart.id === currItem.id);
        return item ? item.quantity : 0;
    }

    return (
        <CartContext.Provider value={{
            cartItems,
            addItem,
            removeItem,
            clearCart,
            getCartTotal,
            getTotalItems,
            getItemCount
        }}>
            {children}
        </CartContext.Provider>
    );
}

export default CartProvider;