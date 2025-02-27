import { useState } from "react";
import "./contactus.css";

const Contactus = () => {
    const [email, setEmail] = useState("");
    const [agreed, setAgreed] = useState(false);

    const handleSubscribe = () => {
        if (!email) {
            alert("Please enter a valid email address.");
            return;
        }
        if (!agreed) {
            alert("Please agree to the terms to subscribe.");
            return;
        }
        alert(`Subscribed successfully with ${email}`);
        setEmail("");
        setAgreed(false);
    };

    return (
        <div className="contactus">
            <div className="subscribe">
                <h2 className="subscribe__title">Let's keep in touch</h2>
                <p className="subscribe__copy">
                    Subscribe to keep up with fresh news and exciting updates. We promise not to spam you!
                </p>
                <div className="form">
                    <input
                        type="email"
                        className="form__email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button className="form__button" onClick={handleSubscribe}>
                        Send
                    </button>
                </div>
                <div className="notice">
                    <input
                        type="checkbox"
                        checked={agreed}
                        onChange={() => setAgreed(!agreed)}
                    />
                    <span className="notice__copy">
                        I agree to my email address being stored and used to receive the monthly newsletter.
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Contactus;