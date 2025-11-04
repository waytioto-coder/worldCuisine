import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Cuisines from './components/Cuisines';
import Recipes from './components/Recipes';
import Blog from './components/Blog';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <Cuisines />
      <Recipes />
      <Blog />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;