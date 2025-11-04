import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

function Cuisines() {
  const [cuisines, setCuisines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCuisines();
  }, []);

  const fetchCuisines = async () => {
    try {
      const { data, error } = await supabase
        .from('cuisines')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;
      setCuisines(data || []);
    } catch (error) {
      console.error('Error fetching cuisines:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="cuisines" className="cuisines">
        <div className="container">
          <h2 className="section-title">Popular Cuisines</h2>
          <p style={{ textAlign: 'center' }}>Loading cuisines...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="cuisines" className="cuisines">
      <div className="container">
        <h2 className="section-title">Popular Cuisines</h2>
        <div className="cuisine-grid">
          {cuisines.length === 0 ? (
            <p style={{ textAlign: 'center', gridColumn: '1 / -1' }}>No cuisines available yet.</p>
          ) : (
            cuisines.map((cuisine) => (
              <div key={cuisine.id} className="cuisine-card">
                <div className="cuisine-image">
                  {cuisine.flag_emoji && (
                    <span className="cuisine-emoji">{cuisine.flag_emoji}</span>
                  )}
                </div>
                <div className="cuisine-content">
                  <h3>{cuisine.name}</h3>
                  <p>{cuisine.description}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default Cuisines;