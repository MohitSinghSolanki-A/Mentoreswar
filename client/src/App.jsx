import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Make sure this is imported

import "./App.css";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Products from "./components/Products/Products";
import Navbar from "./components/Navbar";
import Register from "./components/Register/Register";
import Checkout from "./components/Checkout/Checkout";
import Footer from "./components/Footer/Footer";
import ThankYou from "./components/thankyou/thankyou";
import AboutUs from "./components/aboutus/AboutUs";
import Contact from "./components/Contactus/contactus";
import Mentorship from "./components/Mentorships/Mentorship";
import TestSeries from "./components/Testseries/TestSeries";

export default function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />

        {/* ✅ ToastContainer should be placed here, outside Routes */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<Products />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path='/thankyou' element={<ThankYou />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/aboutus' element={<AboutUs />} />
          <Route path='/mentorship' element={<Mentorship />} />
          <Route path='testseries' element={<TestSeries />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}
