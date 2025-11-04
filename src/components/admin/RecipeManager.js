import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';

function RecipeManager() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    cook_time: '',
    servings: '',
    image_url: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRecipes(data || []);
    } catch (error) {
      setError('Error loading recipes: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async (file) => {
    try {
      setUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('recipe-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('recipe-images')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      setError('Error uploading image: ' + error.message);
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }

    const imageUrl = await uploadImage(file);
    if (imageUrl) {
      setFormData({ ...formData, image_url: imageUrl });
      setSuccess('Image uploaded successfully!');
      setTimeout(() => setSuccess(''), 3000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const dataToSave = {
        ...formData,
        servings: parseInt(formData.servings) || 0,
      };

      if (editingId) {
        const { error } = await supabase
          .from('recipes')
          .update(dataToSave)
          .eq('id', editingId);

        if (error) throw error;
        setSuccess('Recipe updated successfully!');
      } else {
        const { error } = await supabase
          .from('recipes')
          .insert([dataToSave]);

        if (error) throw error;
        setSuccess('Recipe added successfully!');
      }

      setFormData({
        title: '',
        category: '',
        description: '',
        cook_time: '',
        servings: '',
        image_url: '',
      });
      setEditingId(null);
      fetchRecipes();

      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError('Error saving recipe: ' + error.message);
    }
  };

  const handleEdit = (recipe) => {
    setFormData({
      title: recipe.title,
      category: recipe.category,
      description: recipe.description,
      cook_time: recipe.cook_time,
      servings: recipe.servings.toString(),
      image_url: recipe.image_url || '',
    });
    setEditingId(recipe.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this recipe?')) return;

    try {
      const { error } = await supabase
        .from('recipes')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setSuccess('Recipe deleted successfully!');
      fetchRecipes();
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError('Error deleting recipe: ' + error.message);
    }
  };

  const handleCancel = () => {
    setFormData({
      title: '',
      category: '',
      description: '',
      cook_time: '',
      servings: '',
      image_url: '',
    });
    setEditingId(null);
    setError('');
  };

  return (
    <div className="admin-section">
      <h2>Manage Recipes</h2>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <div className="admin-form-card">
        <h3>{editingId ? 'Edit Recipe' : 'Add New Recipe'}</h3>
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-group">
            <label htmlFor="title">Recipe Title *</label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              placeholder="e.g., Classic Margherita Pizza"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Category *</label>
              <input
                type="text"
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
                placeholder="e.g., Italian, Asian"
              />
            </div>

            <div className="form-group">
              <label htmlFor="cook_time">Cook Time *</label>
              <input
                type="text"
                id="cook_time"
                value={formData.cook_time}
                onChange={(e) => setFormData({ ...formData, cook_time: e.target.value })}
                required
                placeholder="e.g., 30 mins"
              />
            </div>

            <div className="form-group">
              <label htmlFor="servings">Servings *</label>
              <input
                type="number"
                id="servings"
                value={formData.servings}
                onChange={(e) => setFormData({ ...formData, servings: e.target.value })}
                required
                placeholder="e.g., 4"
                min="1"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              rows="4"
              placeholder="Brief description of the recipe"
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Recipe Image</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              disabled={uploading}
            />
            <small>Maximum file size: 5MB (JPG, PNG, GIF)</small>
            {uploading && <p className="uploading-text">Uploading image...</p>}
            {formData.image_url && (
              <div className="image-preview">
                <img src={formData.image_url} alt="Preview" />
              </div>
            )}
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={uploading}>
              {editingId ? 'Update Recipe' : 'Add Recipe'}
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
        <h3>All Recipes ({recipes.length})</h3>
        {loading ? (
          <p>Loading recipes...</p>
        ) : recipes.length === 0 ? (
          <p className="empty-state">No recipes yet. Add your first recipe above!</p>
        ) : (
          <div className="admin-grid">
            {recipes.map((recipe) => (
              <div key={recipe.id} className="admin-card">
                {recipe.image_url && (
                  <div className="admin-card-image">
                    <img src={recipe.image_url} alt={recipe.title} />
                  </div>
                )}
                <div className="admin-card-content">
                  <span className="category-badge">{recipe.category}</span>
                  <h4>{recipe.title}</h4>
                  <p>{recipe.description}</p>
                  <div className="recipe-meta">
                    <span>⏱️ {recipe.cook_time}</span>
                    <span>👥 {recipe.servings} servings</span>
                  </div>
                  <div className="admin-card-actions">
                    <button onClick={() => handleEdit(recipe)} className="btn-edit">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(recipe.id)} className="btn-delete">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default RecipeManager;
