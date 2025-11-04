function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-overlay"></div>
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">Discover the World Through Food</h1>
          <p className="hero-subtitle">
            Explore authentic recipes and culinary traditions from every corner of the globe
          </p>
          <a href="#recipes" className="btn btn-primary">Explore Recipes</a>
        </div>
      </div>
    </section>
  );
}

export default Hero;