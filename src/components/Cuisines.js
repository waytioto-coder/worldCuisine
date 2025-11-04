function Cuisines() {
  const cuisines = [
    { name: 'Italian', description: 'Classic pasta, pizza, and Mediterranean flavors' },
    { name: 'Asian', description: 'From sushi to curry, explore Eastern delights' },
    { name: 'Mexican', description: 'Vibrant flavors and traditional dishes' },
    { name: 'Mediterranean', description: 'Healthy and delicious coastal cuisine' },
    { name: 'Indian', description: 'Rich spices and aromatic curries' },
    { name: 'French', description: 'Elegant cooking and refined techniques' }
  ];

  return (
    <section id="cuisines" className="cuisines">
      <div className="container">
        <h2 className="section-title">Popular Cuisines</h2>
        <div className="cuisine-grid">
          {cuisines.map((cuisine, index) => (
            <div key={index} className="cuisine-card">
              <div className="cuisine-image"></div>
              <div className="cuisine-content">
                <h3>{cuisine.name}</h3>
                <p>{cuisine.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Cuisines;