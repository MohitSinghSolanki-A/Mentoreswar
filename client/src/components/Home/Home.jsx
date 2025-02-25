import Navbar from '../Navbar'
import Hero from '../Hero'
import Testimonial from '../Testimonial'
import FAQ from '../FAQ/FAQ'
import Footer from '../Footer/Footer'
import './Home.css'

export default function Home() {
  return (
    <div className="home">
      <Navbar />
      <Hero />
      <Testimonial />
      <FAQ />
      <Footer />
    </div>
  );
}