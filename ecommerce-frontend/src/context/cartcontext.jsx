// src/context/CartContext.jsx
import { createContext, useState, useEffect, useContext } from 'react';

// 1. Buat Context
const CartContext = createContext();

// 2. Buat Provider (Komponen yang akan "membungkus" aplikasi)
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Ambil data dari localStorage saat pertama kali load
    try {
      const localCart = localStorage.getItem('cart');
      return localCart ? JSON.parse(localCart) : [];
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      return [];
    }
  });

  // 3. Simpan ke localStorage setiap kali cartItems berubah
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // 4. Buat fungsi untuk memodifikasi keranjang
  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        // Jika sudah ada, tambah quantity
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Jika belum ada, tambahkan ke array
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
    alert(`${product.name} added to cart!`);
  };

  const removeFromCart = (id) => {
    setCartItems(prevItems => {
      return prevItems.filter(item => item.id !== id);
    });
  };

  const clearCart = () => {
    setCartItems([]); // Cukup set state ke array kosong
  };


  // 5. Berikan state dan fungsi ke "children"
  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// 6. Buat hook kustom untuk mempermudah penggunaan context
// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
    return useContext(CartContext);
}