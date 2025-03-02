
import './Testimonial.css';

export default function Testimonial() {
  const testimonials = [
    {
      id: 1,
      name: "John Doe",
      text: "Amazing service! Highly recommended!",
      role: "CEO, Tech Corp"
    },
    {
      id: 2,
      name: "Jane Smith",
      text: "Best decision we ever made for our business.",
      role: "Founder, StartUp"
    }
  ];

  return (
    <section className="testimonials">
      <div className='testimonials-container'>
        <div className='heading'>
          <h1>What Our Clients Say</h1>
          <div className="testimonial-grid">
            {testimonials.map(testimonial => (
              <div key={testimonial.id} className="testimonial-card">
                <p>"{testimonial.text}"</p>
                <h3>{testimonial.name}</h3>
                <span>{testimonial.role}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
