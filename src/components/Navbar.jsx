import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

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
        <Link to="/" className="nav-logo" onClick={closeMenu}>
          <img src="/khgtech-logo.png" alt="khgtech" className="brand-icon" />
        </Link>

        <div className="menu-icon" onClick={toggleMenu}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </div>

        <ul className={isOpen ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <Link to="/" className={getLinkClass('/')} onClick={closeMenu}>Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/tiktok-demo" className={getLinkClass('/tiktok-demo')} onClick={closeMenu}>Login Kit</Link>
          </li>
          <li className="nav-item">
            <Link to="/contentpost-to-tiktok" className={getLinkClass('/contentpost-to-tiktok')} onClick={closeMenu}>Content Posting API</Link>
          </li>
          <li className="nav-item">
            <Link to="/terms" className={getLinkClass('/terms')} onClick={closeMenu}>Terms of Service</Link>
          </li>
          <li className="nav-item">
            <Link to="/privacy" className={getLinkClass('/privacy')} onClick={closeMenu}>Privacy Policy</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
