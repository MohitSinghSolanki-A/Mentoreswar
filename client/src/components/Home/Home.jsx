import Hero from '../Hero'
import Mentor from '../Mentor/Mentor'
import Feature from '../Feature/Feature'
import Testimonial from '../Testimonial'
import FAQ from '../FAQ/FAQ'
import './Home.css'
import Newsletter from '../Newsletter/Newsletter'
import Helpsection from '../Helpsection/Helpsection'


export default function Home() {
  return (
    <div className="home">
      <Hero />
      <Feature />
      <Mentor />
      <Newsletter />
      <Helpsection />
      <Testimonial />
      <FAQ />
    </div>
  );
}