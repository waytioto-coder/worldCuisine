import { useState } from 'react';

function Footer() {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    console.log('Newsletter subscription:', email);
    alert('Thank you for subscribing to our newsletter!');
    setEmail('');
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <img src="/worldcuisine-logo.png" alt="World Cuisine Logo" className="footer-logo" />
            <p>Bringing the world's flavors to your kitchen</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#recipes">Recipes</a></li>
              <li><a href="#blog">Blog</a></li>
              <li><a href="#about">About</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Categories</h4>
            <ul>
              <li><a href="#">Breakfast</a></li>
              <li><a href="#">Lunch & Dinner</a></li>
              <li><a href="#">Desserts</a></li>
              <li><a href="#">Beverages</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Newsletter</h4>
            <p>Subscribe for weekly recipes and tips</p>
            <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn btn-secondary">Subscribe</button>
            </form>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 World Cuisine. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;