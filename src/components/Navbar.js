import { useState } from 'react';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-wrapper">
          <div className="logo">
            <img src="/worldcuisine-logo.png" alt="World Cuisine Logo" />
          </div>
          <button
            className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
            aria-label="Toggle menu"
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <li><a href="#home" className="nav-link active" onClick={closeMenu}>Home</a></li>
            <li><a href="#recipes" className="nav-link" onClick={closeMenu}>Recipes</a></li>
            <li><a href="#cuisines" className="nav-link" onClick={closeMenu}>Cuisines</a></li>
            <li><a href="#blog" className="nav-link" onClick={closeMenu}>Blog</a></li>
            <li><a href="#about" className="nav-link" onClick={closeMenu}>About</a></li>
            <li><a href="#contact" className="nav-link" onClick={closeMenu}>Contact</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;