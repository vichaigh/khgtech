import { Mail, Globe, MessageCircle, Share2, Link as LinkIcon } from 'lucide-react';
import './Footer.css';

const SITE_URL = 'https://khgtech.vip';

const Footer = () => {
  return (
    <footer className="footer animate-fade-in">
      <div className="container footer-container">

        <div className="footer-col">
          <a href={`${SITE_URL}/`} className="footer-logo">
            <img src="/khgtech-logo.png" alt="khgtech" className="footer-logo-img" />
          </a>
          <p className="footer-desc">
            khgtech is a software platform that helps users and teams work more efficiently — with powerful integrations, workflow tools, and a clean, developer-friendly API.
          </p>
          <div className="social-links">
            <a href={SITE_URL} className="social-icon"><Globe size={20} /></a>
            <a href="#" className="social-icon"><MessageCircle size={20} /></a>
            <a href="#" className="social-icon"><Share2 size={20} /></a>
            <a href="#" className="social-icon"><LinkIcon size={20} /></a>
          </div>
        </div>

        <div className="footer-col">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><a href={`${SITE_URL}/`}>Home</a></li>
            <li><a href={`${SITE_URL}/tiktok-demo`}>Login Kit</a></li>
            <li><a href={`${SITE_URL}/contentpost-to-tiktok`}>Content Posting API</a></li>
            <li><a href={`${SITE_URL}/privacy`}>Privacy Policy</a></li>
            <li><a href={`${SITE_URL}/terms`}>Terms of Service</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Platform</h3>
          <ul className="footer-links">
            <li><a href={`${SITE_URL}/tiktok-demo`}>TikTok Login Kit</a></li>
            <li><a href={`${SITE_URL}/contentpost-to-tiktok`}>Content Posting API</a></li>
            <li><a href={`${SITE_URL}/privacy`}>Privacy Policy</a></li>
            <li><a href={`${SITE_URL}/terms`}>Terms of Service</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Contact</h3>
          <div className="contact-info">
            <div className="contact-item">
              <Mail size={18} className="contact-icon" />
              <a href="mailto:hello@khgtech.vip">hello@khgtech.vip</a>
            </div>
            <div className="contact-item">
              <Globe size={18} className="contact-icon" />
              <a href={SITE_URL}>{SITE_URL}</a>
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
