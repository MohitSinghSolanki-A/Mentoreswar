import './FAQ.css';
import { useState } from "react";


const faqs = [
  { question: "Why is the moon sometimes out during the day?", answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
  { question: "Why is the sky blue?", answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
  { question: "Will we ever discover aliens?", answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
  { question: "How much does the Earth weigh?", answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
  { question: "How do airplanes stay up?", answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="container">
      <h2 className="faq-title">Frequently Asked Questions</h2>
      <div className="accordion">
        {faqs.map((faq, index) => (
          <div key={index} className="accordion-item">
            <button
              onClick={() => toggleAccordion(index)}
              className={openIndex === index ? "active" : ""}
              aria-expanded={openIndex === index}
            >
              <span className="accordion-title">{faq.question}</span>
              <span className="icon">{openIndex === index ? "▲" : "▼"}</span>
            </button>
            {openIndex === index && (
              <div className="accordion-content">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
