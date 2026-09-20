import { useState } from 'react';
import Header from '../components/Header.jsx';
import Hero from '../components/Hero.jsx';
import TrustBar from '../components/TrustBar.jsx';
import Services from '../components/Services.jsx';
import About from '../components/About.jsx';
import Gallery from '../components/Gallery.jsx';
import ServiceArea from '../components/ServiceArea.jsx';
import Contact from '../components/Contact.jsx';
import Footer from '../components/Footer.jsx';

export default function HomePage() {
  // Wird von den Leistungskarten gesetzt und im Kontaktformular vorausgewählt
  const [selectedService, setSelectedService] = useState('');

  return (
    <>
      <a className="skip-link" href="#inhalt">
        Zum Inhalt springen
      </a>
      <Header />
      <main id="inhalt">
        <Hero />
        <TrustBar />
        <Services onSelectService={setSelectedService} />
        <About />
        <Gallery />
        <ServiceArea />
        <Contact selectedService={selectedService} />
      </main>
      <Footer />
    </>
  );
}
