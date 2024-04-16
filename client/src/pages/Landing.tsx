import React from "react";
import Hero from "./components/hero.tsx"; // Assuming Hero is a React component
import Features from "./components/features.tsx"; // Assuming Features is a React component
import FeaturesBlocks from "./components/features-blocks.tsx"; // Assuming FeaturesBlocks is a React component
import Testimonials from "./components/testimonials.tsx"; // Assuming Testimonials is a React component
import Newsletter from "./components/newsletter.tsx";
import Header from "./components/ui/header.tsx"; // Assuming Newsletter is a React component
import Footer from "./components/ui/footer.tsx";

const Home = () => {
  return (
    <div>
      <Header />
      <Hero />
      <Features />
      <FeaturesBlocks />
      <Testimonials />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
