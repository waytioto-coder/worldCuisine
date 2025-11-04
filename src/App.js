import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Cuisines from './components/Cuisines';
import Recipes from './components/Recipes';
import Blog from './components/Blog';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './components/admin/AdminDashboard';

function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Cuisines />
      <Recipes />
      <Blog />
      <About />
      <Contact />
      <Footer />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;