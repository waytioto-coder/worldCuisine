import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';

function BlogManager() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    date: new Date().toISOString().split('T')[0],
    author: 'Admin',
    image_url: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      setError('Error loading blog posts: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async (file) => {
    try {
      setUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `blog-${Math.random()}-${Date.now()}.${fileExt}`;
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
      if (editingId) {
        const { error } = await supabase
          .from('blog_posts')
          .update(formData)
          .eq('id', editingId);

        if (error) throw error;
        setSuccess('Blog post updated successfully!');
      } else {
        const { error } = await supabase
          .from('blog_posts')
          .insert([formData]);

        if (error) throw error;
        setSuccess('Blog post added successfully!');
      }

      setFormData({
        title: '',
        excerpt: '',
        content: '',
        date: new Date().toISOString().split('T')[0],
        author: 'Admin',
        image_url: '',
      });
      setEditingId(null);
      fetchPosts();

      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError('Error saving blog post: ' + error.message);
    }
  };

  const handleEdit = (post) => {
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content || '',
      date: post.date,
      author: post.author,
      image_url: post.image_url || '',
    });
    setEditingId(post.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) return;

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setSuccess('Blog post deleted successfully!');
      fetchPosts();
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError('Error deleting blog post: ' + error.message);
    }
  };

  const handleCancel = () => {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      date: new Date().toISOString().split('T')[0],
      author: 'Admin',
      image_url: '',
    });
    setEditingId(null);
    setError('');
  };

  return (
    <div className="admin-section">
      <h2>Manage Blog Posts</h2>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <div className="admin-form-card">
        <h3>{editingId ? 'Edit Blog Post' : 'Add New Blog Post'}</h3>
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-group">
            <label htmlFor="title">Post Title *</label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              placeholder="e.g., 10 Essential Kitchen Tools for Home Cooks"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="date">Date *</label>
              <input
                type="date"
                id="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="author">Author *</label>
              <input
                type="text"
                id="author"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                required
                placeholder="e.g., Admin"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="excerpt">Excerpt *</label>
            <textarea
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              required
              rows="2"
              placeholder="Short summary that appears on the blog listing (1-2 sentences)"
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">Full Content</label>
            <textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows="8"
              placeholder="Full blog post content (optional)"
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Featured Image</label>
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
              {editingId ? 'Update Post' : 'Add Post'}
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
        <h3>All Blog Posts ({posts.length})</h3>
        {loading ? (
          <p>Loading blog posts...</p>
        ) : posts.length === 0 ? (
          <p className="empty-state">No blog posts yet. Add your first post above!</p>
        ) : (
          <div className="admin-table">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Excerpt</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id}>
                    <td>{new Date(post.date).toLocaleDateString()}</td>
                    <td><strong>{post.title}</strong></td>
                    <td>{post.author}</td>
                    <td className="excerpt-cell">{post.excerpt}</td>
                    <td className="actions-cell">
                      <button onClick={() => handleEdit(post)} className="btn-edit">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(post.id)} className="btn-delete">
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

export default BlogManager;
