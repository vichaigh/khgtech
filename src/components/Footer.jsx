import { Link } from 'react-router-dom';
import { Mail, Globe, MessageCircle, Share2, Link as LinkIcon } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer animate-fade-in">
      <div className="container footer-container">

        <div className="footer-col">
          <Link to="/" className="footer-logo">
            <img src="/khgtech-logo.png" alt="khgtech" className="footer-logo-img" />
          </Link>
          <p className="footer-desc">
            khgtech is a software platform that helps users and teams work more efficiently — with powerful integrations, workflow tools, and a clean, developer-friendly API.
          </p>
          <div className="social-links">
            <a href="https://khgtech.vip" className="social-icon"><Globe size={20} /></a>
            <a href="#" className="social-icon"><MessageCircle size={20} /></a>
            <a href="#" className="social-icon"><Share2 size={20} /></a>
            <a href="#" className="social-icon"><LinkIcon size={20} /></a>
          </div>
        </div>

        <div className="footer-col">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/tiktok-demo">Login Kit</Link></li>
            <li><Link to="/contentpost-to-tiktok">Content Posting API</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms of Service</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Platform</h3>
          <ul className="footer-links">
            <li><Link to="/tiktok-demo">TikTok Login Kit</Link></li>
            <li><Link to="/contentpost-to-tiktok">Content Posting API</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms of Service</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Contact</h3>
          <div className="contact-info">
            <div className="contact-item">
              <Mail size={18} className="contact-icon" />
              <span>hello@khgtech.vip</span>
            </div>
            <div className="contact-item">
              <Globe size={18} className="contact-icon" />
              <span>https://khgtech.vip</span>
            </div>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} khgtech. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
