import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

const SITE_URL = 'https://khgtech.vip';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const getLinkClass = (path) => {
    return location.pathname === path ? 'nav-link active' : 'nav-link';
  };

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <a href={`${SITE_URL}/`} className="nav-logo" onClick={closeMenu}>
          <img src="/khgtech-logo.png" alt="khgtech" className="brand-icon" />
        </a>

        <div className="menu-icon" onClick={toggleMenu}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </div>

        <ul className={isOpen ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <a href={`${SITE_URL}/`} className={getLinkClass('/')} onClick={closeMenu}>
              Home
            </a>
          </li>
          <li className="nav-item">
            <a
              href={`${SITE_URL}/tiktok-demo`}
              className={getLinkClass('/tiktok-demo')}
              onClick={closeMenu}
            >
              Login Kit
            </a>
          </li>
          <li className="nav-item">
            <a
              href={`${SITE_URL}/contentpost-to-tiktok`}
              className={getLinkClass('/contentpost-to-tiktok')}
              onClick={closeMenu}
            >
              Content Posting API
            </a>
          </li>
          <li className="nav-item">
            <a
              href={`${SITE_URL}/terms`}
              className={getLinkClass('/terms')}
              onClick={closeMenu}
            >
              Terms of Service
            </a>
          </li>
          <li className="nav-item">
            <a
              href={`${SITE_URL}/privacy`}
              className={getLinkClass('/privacy')}
              onClick={closeMenu}
            >
              Privacy Policy
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
