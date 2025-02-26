import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const addToCart = (product, selectedSubjects) => {
    const selectedDetails = product.subjects.filter((s) =>
      selectedSubjects.includes(s.name)
    );

    const totalPrice = selectedDetails.reduce((sum, s) => sum + s.price, 0);

    const newCartItem = {
      _id: product._id, // Ensure this is the correct ID
      title: product.title,
      imageUrl: product.imageUrl,
      subjects: selectedSubjects,
      price: totalPrice, // Ensure price is stored
    };

    setCart((prevCart) => {
      const newCart = [...prevCart, newCartItem];
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item._id !== productId);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}
