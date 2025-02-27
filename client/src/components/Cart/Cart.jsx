import { useContext } from "react";
import { CartContext } from "./CartContext";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

export default function Cart() {
    const { cart, removeFromCart } = useContext(CartContext);
    const navigate = useNavigate();

    const handleCheckout = () => {
        if (cart.length === 0) {
            alert("⚠️ Your cart is empty!");
            return;
        }
        localStorage.setItem("cartItems", JSON.stringify(cart)); // Store cart in local storage
        navigate("/checkout");
    };

    const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

    return (
        <div className="cart-container">
            <h2>Shopping Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <div className="cart-items">
                    {cart.map((item) => (
                        <div key={item._id} className="cart-item">
                            <img src={item.imageUrl} alt={item.title} className="cart-image" />
                            <div className="cart-details">
                                <h3>{item.title}</h3>
                                <p><strong>Price: ₹{item.price}</strong></p>
                                <button onClick={() => removeFromCart(item._id)}>Remove</button>
                            </div>
                        </div>
                    ))}
                    <h2>Total: ₹{totalAmount}</h2>
                    <button className="checkout-btn" onClick={handleCheckout}>
                        Buy Now
                    </button>
                </div>
            )}
        </div>
    );
}
