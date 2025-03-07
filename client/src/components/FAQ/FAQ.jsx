import './FAQ.css';
import { useState } from "react";
import { FaCircleChevronUp, FaCircleChevronDown, FaQ } from "react-icons/fa6";

const faqs = [
  { question: "Why is the moon sometimes out during the day?", answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
  { question: "Why is the sky blue?", answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
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
      <div className='accordion-drop-down'>
        {faqs.map((faq, index) => (
          <div key={index} className='accordion-item'>
            <div
              onClick={() => toggleAccordion(index)}
              className={`accordion-header ${openIndex === index ? "active" : ""}`}
              aria-expanded={openIndex === index}
              role="button" // Important for accessibility
              tabIndex="0" // Important for accessibility
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  toggleAccordion(index);
                }
              }}
            >
              <span className="accordion-title ques"><FaQ />{faq.question}</span>
              <span className="icon">{openIndex === index ? <FaCircleChevronUp /> : <FaCircleChevronDown />}</span>
            </div>
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
