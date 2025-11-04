import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRecipes(data || []);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="recipes" className="recipes">
        <div className="container">
          <h2 className="section-title">Latest Recipes</h2>
          <p style={{ textAlign: 'center' }}>Loading recipes...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="recipes" className="recipes">
      <div className="container">
        <h2 className="section-title">Latest Recipes</h2>
        <div className="recipe-grid">
          {recipes.length === 0 ? (
            <p style={{ textAlign: 'center', gridColumn: '1 / -1' }}>No recipes available yet.</p>
          ) : (
            recipes.map((recipe) => (
              <article key={recipe.id} className="recipe-card">
                <div
                  className="recipe-image"
                  style={recipe.image_url ? { backgroundImage: `url(${recipe.image_url})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
                ></div>
                <div className="recipe-info">
                  <span className="recipe-category">{recipe.category}</span>
                  <h3 className="recipe-title">{recipe.title}</h3>
                  <p className="recipe-description">{recipe.description}</p>
                  <div className="recipe-meta">
                    <span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M12 6v6l4 2"/>
                      </svg> {recipe.cook_time}
                    </span>
                    <span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                      </svg> {recipe.servings} servings
                    </span>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default Recipes;