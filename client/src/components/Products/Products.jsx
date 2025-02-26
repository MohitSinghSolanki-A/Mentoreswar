import { useState, useEffect, useContext } from "react";
import { useLocation } from "wouter";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Products.css"; // External CSS only
import { CartContext } from "../Cart/CartContext"; // Ensure correct import

export default function Products() {
  const [products, setProducts] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState({});
  const [, setLocation] = useLocation();
  const { addToCart } = useContext(CartContext);
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSubjectSelection = (productId, subject) => {
    setSelectedSubjects((prev) => {
      const productSubjects = new Set(prev[productId] || []);
      productSubjects.has(subject.name)
        ? productSubjects.delete(subject.name)
        : productSubjects.add(subject.name);
      return { ...prev, [productId]: Array.from(productSubjects) };
    });
  };

  const handleAddToCart = (product) => {
    if (!isAuthenticated) {
      toast.warn("⚠️ Please log in to buy!", { position: "top-right" });
      return;
    } else {
      const selected = selectedSubjects[product._id] || [];
      if (selected.length === 0) {
        toast.warn("⚠️ Please select at least one subject!", { position: "top-right" });
        return;
      }

      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const sortedSelected = [...selected].sort();

      const existingIndex = cart.findIndex(
        (item) =>
          item.productId === product._id &&
          JSON.stringify(item.subjects) === JSON.stringify(sortedSelected)
      );

      if (existingIndex !== -1) {
        toast.info("ℹ️ Already in cart!", { position: "top-right" });
        return;
      }

      const totalPrice = product.subjects
        .filter((s) => sortedSelected.includes(s.name))
        .reduce((sum, s) => sum + s.price, 0);

      const cartItem = {
        productId: product._id,
        title: product.title,
        subjects: sortedSelected,
        totalPrice,
      };

      cart.push(cartItem);
      localStorage.setItem("cart", JSON.stringify(cart));
      toast.success("✅ Added to cart!", { position: "top-right" });

      // Update context cart state if necessary
      addToCart(cartItem);
    }
  };

  const handleBuyNow = (product) => {
    if (!isAuthenticated) {
      toast.warn("⚠️ Please log in to buy!", { position: "top-right" });
      return;
    }

    const selected = selectedSubjects[product._id] || [];
    if (selected.length === 0) {
      toast.warn("⚠️ Please select at least one subject!", { position: "top-right" });
      return;
    }

    const selectedDetails = product.subjects.filter((s) => selected.includes(s.name));
    const totalPrice = selectedDetails.reduce((sum, s) => sum + s.price, 0);

    setLocation(
      `/checkout?productId=${product._id}&title=${encodeURIComponent(selected.join(", "))}&price=${totalPrice}`
    );
  };

  return (
    <div className="products-container">
      <ToastContainer />
      <h1 className="title">Available Test Series</h1>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <img src={product.imageUrl} alt={product.title} className="product-image" />
            <h3 className="product-title">{product.title}</h3>
            <p className="product-description">{product.description}</p>

            {product.isTestSeries && (
              <div className="subjects-container">
                <h4 className="subjects-title">Select Subjects:</h4>
                {product.subjects.map((subject) => (
                  <div key={subject.name} className="subject-item">
                    <input
                      type="checkbox"
                      id={`${product._id}-${subject.name}`}
                      checked={selectedSubjects[product._id]?.includes(subject.name) || false}
                      onChange={() => handleSubjectSelection(product._id, subject)}
                    />
                    <label htmlFor={`${product._id}-${subject.name}`} className="subject-label">
                      {subject.name} - ₹{subject.price}
                    </label>
                  </div>
                ))}
                <div className="button-container">
                  <button className="add-to-cart" onClick={() => handleAddToCart(product)}>🛒 Add to Cart</button>
                  <button className="buy-button" onClick={() => handleBuyNow(product)}>💳 Buy Now</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
