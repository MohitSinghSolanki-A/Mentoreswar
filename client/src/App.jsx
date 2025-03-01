import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Products from "./components/Products/Products";
import Navbar from "./components/Navbar";
import Register from "./components/Register/Register";
import Checkout from "./components/Checkout/Checkout";
import Footer from "./components/Footer/Footer";
import Contact from "./components/Contactus/contactus";
import ThankYou from "./components/thankyou/thankyou";
import AboutUs from "./components/aboutus/AboutUs";

export default function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/products" element={<Products />} />
            <Route path="/register" element={<Register />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path='/thankyou' element={<ThankYou />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/aboutus' element={<AboutUs />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}
