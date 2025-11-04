import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';

function CuisineManager() {
  const [cuisines, setCuisines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    flag_emoji: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchCuisines();
  }, []);

  const fetchCuisines = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('cuisines')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCuisines(data || []);
    } catch (error) {
      setError('Error loading cuisines: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (editingId) {
        const { error } = await supabase
          .from('cuisines')
          .update(formData)
          .eq('id', editingId);

        if (error) throw error;
        setSuccess('Cuisine updated successfully!');
      } else {
        const { error } = await supabase
          .from('cuisines')
          .insert([formData]);

        if (error) throw error;
        setSuccess('Cuisine added successfully!');
      }

      setFormData({ name: '', description: '', flag_emoji: '' });
      setEditingId(null);
      fetchCuisines();

      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError('Error saving cuisine: ' + error.message);
    }
  };

  const handleEdit = (cuisine) => {
    setFormData({
      name: cuisine.name,
      description: cuisine.description,
      flag_emoji: cuisine.flag_emoji || '',
    });
    setEditingId(cuisine.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this cuisine?')) return;

    try {
      const { error } = await supabase
        .from('cuisines')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setSuccess('Cuisine deleted successfully!');
      fetchCuisines();
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError('Error deleting cuisine: ' + error.message);
    }
  };

  const handleCancel = () => {
    setFormData({ name: '', description: '', flag_emoji: '' });
    setEditingId(null);
    setError('');
  };

  return (
    <div className="admin-section">
      <h2>Manage Cuisines</h2>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <div className="admin-form-card">
        <h3>{editingId ? 'Edit Cuisine' : 'Add New Cuisine'}</h3>
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-group">
            <label htmlFor="name">Cuisine Name *</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              placeholder="e.g., Italian, Asian, Mexican"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              rows="3"
              placeholder="Brief description of the cuisine"
            />
          </div>

          <div className="form-group">
            <label htmlFor="flag_emoji">Flag Emoji (optional)</label>
            <input
              type="text"
              id="flag_emoji"
              value={formData.flag_emoji}
              onChange={(e) => setFormData({ ...formData, flag_emoji: e.target.value })}
              placeholder="e.g., 🇮🇹 🇨🇳 🇲🇽"
              maxLength="10"
            />
            <small>Copy and paste an emoji or flag</small>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              {editingId ? 'Update Cuisine' : 'Add Cuisine'}
            </button>
            {editingId && (
              <button type="button" onClick={handleCancel} className="btn btn-secondary">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="admin-list">
        <h3>All Cuisines ({cuisines.length})</h3>
        {loading ? (
          <p>Loading cuisines...</p>
        ) : cuisines.length === 0 ? (
          <p className="empty-state">No cuisines yet. Add your first cuisine above!</p>
        ) : (
          <div className="admin-table">
            <table>
              <thead>
                <tr>
                  <th>Emoji</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cuisines.map((cuisine) => (
                  <tr key={cuisine.id}>
                    <td className="emoji-cell">{cuisine.flag_emoji || '🍽️'}</td>
                    <td><strong>{cuisine.name}</strong></td>
                    <td>{cuisine.description}</td>
                    <td className="actions-cell">
                      <button onClick={() => handleEdit(cuisine)} className="btn-edit">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(cuisine.id)} className="btn-delete">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default CuisineManager;
