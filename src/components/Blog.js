import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

function Blog() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('date', { ascending: false })
        .limit(3);

      if (error) throw error;
      setBlogPosts(data || []);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  if (loading) {
    return (
      <section id="blog" className="blog">
        <div className="container">
          <h2 className="section-title">Latest From The Blog</h2>
          <p style={{ textAlign: 'center' }}>Loading blog posts...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="blog">
      <div className="container">
        <h2 className="section-title">Latest From The Blog</h2>
        <div className="blog-grid">
          {blogPosts.length === 0 ? (
            <p style={{ textAlign: 'center', gridColumn: '1 / -1' }}>No blog posts available yet.</p>
          ) : (
            blogPosts.map((post) => (
              <article key={post.id} className="blog-card">
                <div
                  className="blog-image"
                  style={post.image_url ? { backgroundImage: `url(${post.image_url})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
                ></div>
                <div className="blog-content">
                  <span className="blog-date">{formatDate(post.date)}</span>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <a href="#" className="read-more">Read More →</a>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default Blog;