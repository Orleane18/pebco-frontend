import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import CreditTypes from '../components/CreditTypes';
import Advantages from '../components/Advantages';
import Actualites from '../components/Actualites';
import Testimonials from '../components/Testimonials';

function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <CreditTypes />
      <Advantages />
      <Actualites />
      <Testimonials />
    </>
  );
}
export default HomePage;