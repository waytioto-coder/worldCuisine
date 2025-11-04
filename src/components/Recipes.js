function Recipes() {
  const recipes = [
    {
      category: 'Italian',
      title: 'Authentic Pizza Margherita',
      description: 'Traditional Neapolitan pizza with fresh mozzarella and basil',
      time: '30 min',
      servings: '4 servings'
    },
    {
      category: 'Japanese',
      title: 'Homemade Sushi Rolls',
      description: 'Fresh sushi with salmon, avocado, and cucumber',
      time: '45 min',
      servings: '2 servings'
    },
    {
      category: 'Mexican',
      title: 'Spicy Chicken Tacos',
      description: 'Authentic street-style tacos with homemade salsa',
      time: '25 min',
      servings: '4 servings'
    },
    {
      category: 'Indian',
      title: 'Butter Chicken Curry',
      description: 'Creamy tomato-based curry with tender chicken',
      time: '50 min',
      servings: '6 servings'
    },
    {
      category: 'Mediterranean',
      title: 'Greek Salad Bowl',
      description: 'Fresh vegetables with feta and olives',
      time: '15 min',
      servings: '2 servings'
    },
    {
      category: 'Thai',
      title: 'Pad Thai Noodles',
      description: 'Sweet and tangy stir-fried rice noodles',
      time: '35 min',
      servings: '3 servings'
    }
  ];

  return (
    <section id="recipes" className="recipes">
      <div className="container">
        <h2 className="section-title">Latest Recipes</h2>
        <div className="recipe-grid">
          {recipes.map((recipe, index) => (
            <article key={index} className="recipe-card">
              <div className="recipe-image"></div>
              <div className="recipe-info">
                <span className="recipe-category">{recipe.category}</span>
                <h3 className="recipe-title">{recipe.title}</h3>
                <p className="recipe-description">{recipe.description}</p>
                <div className="recipe-meta">
                  <span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M12 6v6l4 2"/>
                    </svg> {recipe.time}
                  </span>
                  <span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg> {recipe.servings}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Recipes;