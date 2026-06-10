import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, ShieldCheck, Share2, ArrowRight, LayoutDashboard, Users, Code2 } from 'lucide-react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page animate-fade-in">

      {/* Hero */}
      <section className="hero">
        <div className="container hero-container">
          <div className="hero-content">
            <div className="badge">Software Platform</div>
            <h1 className="hero-title">
              The Platform That Makes Your <span className="text-gradient">Work Better</span>
            </h1>
            <p className="hero-subtitle">
              khgtech is a software system built for teams and creators. Integrate powerful tools, manage your content workflow, and connect with platforms like TikTok — all in one place.
            </p>
            <div className="hero-cta">
              <Link to="/tiktok-demo" className="btn btn-primary">
                Login Kit
              </Link>
              <Link to="/contentpost-to-tiktok" className="btn btn-outline">
                Content Posting API
              </Link>
            </div>
          </div>
          <div className="hero-image-wrapper">
            <div className="glow-effect"></div>
            <div className="hero-graphic">
              <LayoutDashboard size={100} className="graphic-icon" />
              <div className="graphic-stats">
                <div className="stat">
                  <span className="stat-val">API</span>
                  <span className="stat-label">First Design</span>
                </div>
                <div className="stat">
                  <span className="stat-val">24/7</span>
                  <span className="stat-label">Availability</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features pad-y">
        <div className="container">
          <h2 className="section-title">Built for <span className="text-gradient">Modern Teams</span></h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <Code2 className="feature-icon" size={32} />
              </div>
              <h3>TikTok Login Kit</h3>
              <p>Let users sign in with their TikTok account seamlessly. Access basic profile data through a secure, scoped OAuth flow.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <Share2 className="feature-icon" size={32} />
              </div>
              <h3>Content Posting API</h3>
              <p>Upload and publish videos to TikTok directly from your workflow. Full support for drafts, privacy settings, and interaction controls.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <Zap className="feature-icon" size={32} />
              </div>
              <h3>Workflow Automation</h3>
              <p>Streamline repetitive tasks and automate your content pipeline. Save time so your team can focus on what matters most.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <ShieldCheck className="feature-icon" size={32} />
              </div>
              <h3>Secure by Default</h3>
              <p>Data encrypted in transit, token-based authentication, and strict scope permissions to keep your accounts and data protected.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <Users className="feature-icon" size={32} />
              </div>
              <h3>Team Ready</h3>
              <p>Designed for both individual creators and larger teams. Manage multiple connected accounts and workflows from one platform.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <LayoutDashboard className="feature-icon" size={32} />
              </div>
              <h3>Clear Dashboard</h3>
              <p>A clean, intuitive interface that keeps your workflow visible. No clutter — just the tools and status you need at a glance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section pad-y">
        <div className="container cta-container">
          <div className="cta-content">
            <h2>Ready to work smarter?</h2>
            <p>Start using khgtech today — connect your TikTok account, set up your content workflow, and get more done with less effort.</p>
          </div>
          <Link to="/tiktok-demo" className="btn btn-primary cta-btn">
            Get Started <ArrowRight size={20} />
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Home;
