import './FAQ.css';

export default function FAQ() {
  const faqs = [
    {
      id: 1,
      question: "What services do you offer?",
      answer: "We offer a wide range of digital solutions including web development, mobile apps, and cloud services."
    },
    {
      id: 2,
      question: "How can I get started?",
      answer: "Simply contact us through our contact form or click the 'Get Started' button above."
    },
    {
      id: 3,
      question: "What are your pricing plans?",
      answer: "We offer customized pricing based on your specific needs. Contact us for a quote."
    }
  ];

  return (
    <section className="faq-section">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-container">
        {faqs.map(faq => (
          <div key={faq.id} className="faq-item">
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}