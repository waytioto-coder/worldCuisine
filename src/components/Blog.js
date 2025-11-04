function Blog() {
  const blogPosts = [
    {
      date: 'November 1, 2025',
      title: 'Essential Spices for Your Global Kitchen',
      description: 'Discover the must-have spices that will transform your cooking and bring authentic flavors to your dishes.'
    },
    {
      date: 'October 28, 2025',
      title: 'The Art of Pasta Making',
      description: 'Learn the traditional techniques for creating perfect homemade pasta from scratch.'
    },
    {
      date: 'October 25, 2025',
      title: 'Street Food Around the World',
      description: 'A culinary journey through the best street food destinations and their iconic dishes.'
    }
  ];

  return (
    <section id="blog" className="blog">
      <div className="container">
        <h2 className="section-title">Latest From The Blog</h2>
        <div className="blog-grid">
          {blogPosts.map((post, index) => (
            <article key={index} className="blog-card">
              <div className="blog-image"></div>
              <div className="blog-content">
                <span className="blog-date">{post.date}</span>
                <h3>{post.title}</h3>
                <p>{post.description}</p>
                <a href="#" className="read-more">Read More →</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Blog;