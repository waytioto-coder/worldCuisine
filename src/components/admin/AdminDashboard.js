import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import CuisineManager from './CuisineManager';
import RecipeManager from './RecipeManager';
import BlogManager from './BlogManager';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('cuisines');
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="admin-header-content">
          <h1>Admin Dashboard</h1>
          <div className="admin-user-info">
            <span>{user?.email}</span>
            <button onClick={handleSignOut} className="btn-signout">
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <div className="admin-content">
        <nav className="admin-sidebar">
          <ul>
            <li className={activeTab === 'cuisines' ? 'active' : ''}>
              <button onClick={() => setActiveTab('cuisines')}>
                <span className="icon">🍽️</span>
                Cuisines
              </button>
            </li>
            <li className={activeTab === 'recipes' ? 'active' : ''}>
              <button onClick={() => setActiveTab('recipes')}>
                <span className="icon">📖</span>
                Recipes
              </button>
            </li>
            <li className={activeTab === 'blog' ? 'active' : ''}>
              <button onClick={() => setActiveTab('blog')}>
                <span className="icon">✍️</span>
                Blog Posts
              </button>
            </li>
            <li>
              <a href="/" className="view-site-link">
                <span className="icon">🌐</span>
                View Site
              </a>
            </li>
          </ul>
        </nav>

        <main className="admin-main">
          {activeTab === 'cuisines' && <CuisineManager />}
          {activeTab === 'recipes' && <RecipeManager />}
          {activeTab === 'blog' && <BlogManager />}
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
