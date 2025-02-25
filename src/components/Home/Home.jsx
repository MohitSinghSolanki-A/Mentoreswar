import Navbar from '../Navbar'
import Hero from '../Hero'
import Testimonial from '../Testimonial'
import './Home.css'

export default function Home() {
  return (
    <div className="home">
      <Navbar />
      <Hero />
      <Testimonial />
    </div>
  );
}