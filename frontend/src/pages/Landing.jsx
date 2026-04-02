import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPackage, FiPlay, FiX, FiCheckCircle } from 'react-icons/fi';
import './Landing.css';
import bridgeBg from '../assets/images/bridge-bg.png';

const Landing = () => {
  const [showVideo, setShowVideo] = useState(false);
  return (
    <div className="landing-page">
      <div id="home" className="hero-section" style={{ backgroundImage: `url(${bridgeBg})` }}>
        <header className="landing-header">
          <div className="landing-logo">
            <FiPackage className="icon" />
            <span>Inventory Pro</span>
          </div>
          <nav className="landing-nav">
            <a href="#home">HOME</a>
            <a href="#how">HOW IT WORKS</a>
            <a href="#contact">CONTACT US</a>
            <Link to="/login" className="login-btn-outline">LOG IN</Link>
          </nav>
        </header>

        <main className="landing-main">
          <div className="landing-content">
            <h1>Streamlined<br/>Inventory</h1>
            <p>
              It is so simple<br/>
              that's why it is so effective
            </p>
            <div className="landing-actions">
              <Link to="/login" className="btn-primary-outline">Get Started</Link>
              <button className="btn-video" onClick={() => setShowVideo(true)}>
                <span className="play-icon"><FiPlay fill="currentColor" /></span>
                Watch Video
              </button>
            </div>
          </div>
        </main>
      </div>

      <section id="how" className="feature-section">
        <div className="section-container">
          <h2>How It Works</h2>
          <p className="section-subtitle">A seamless process to track, manage, and optimize your inventory from supplier to customer.</p>
          <div className="features-grid">
            <div className="feature-card">
              <FiCheckCircle className="feature-icon" />
              <h3>1. Register Stock</h3>
              <p>Easily input new products via dashboard or connect directly to your supply chain feed.</p>
            </div>
            <div className="feature-card">
              <FiCheckCircle className="feature-icon" />
              <h3>2. Monitor Real-Time</h3>
              <p>Watch stock levels go up and down as orders are fulfilled and alerts are triggered.</p>
            </div>
            <div className="feature-card">
              <FiCheckCircle className="feature-icon" />
              <h3>3. Generate Insights</h3>
              <p>Leverage our advanced analytics to identify trends and minimize dead stock.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="section-container contact-container">
          <div className="contact-info">
            <h2>Get In Touch</h2>
            <p>Need support or an enterprise upgrade? Let's talk.</p>
          </div>
          <form className="contact-form" onSubmit={(e) => { e.preventDefault(); alert('Message sent!'); }}>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea rows="4" placeholder="How can we help?" required></textarea>
            <button type="submit" className="btn-primary-outline" style={{ background: '#4c1d95', border: 'none' }}>Send Message</button>
          </form>
        </div>
      </section>

      {/* Video Modal */}
      {showVideo && (
        <div className="video-modal-overlay" onClick={() => setShowVideo(false)}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-video-btn" onClick={() => setShowVideo(false)}>
              <FiX size={24} />
            </button>
            <div className="video-wrapper">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/0NOER-Lle-0?autoplay=1" 
                title="Inventory Management System" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Landing;
