import Hero from '../Hero'
import Testimonial from '../Testimonial'
import FAQ from '../FAQ/FAQ'
import './Home.css'

export default function Home() {
  return (
    <div className="home">
      <Hero />
      <Testimonial />
      <FAQ />
    </div>
  );
}