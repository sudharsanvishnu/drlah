import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest(".nav-container")) {
        closeMenu();
      }
    };

    if (isMenuOpen) {
      document.addEventListener("click", handleClickOutside);
      // Prevent body scroll when menu is open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav className="navigation">
        <div className="nav-container">
          <button
            className="hamburger-menu"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span
              className={`hamburger-line ${isMenuOpen ? "open" : ""}`}
            ></span>
            <span
              className={`hamburger-line ${isMenuOpen ? "open" : ""}`}
            ></span>
            <span
              className={`hamburger-line ${isMenuOpen ? "open" : ""}`}
            ></span>
          </button>
          <img
            src="https://www.drivelah.sg/static/media/newLogo.17a5a13f.png"
            alt="Drive lah"
            className="nav-logo"
          />
          <img
            src="https://dv0eqz2t0y9gj.cloudfront.net/drivelah/b-landing/renters-img.webp"
            alt="User"
            className="nav-icon-mobile"
          />
          <ul className={`nav-menu ${isMenuOpen ? "open" : ""}`}>
            <li>
              <Link to="/" className="nav-link" onClick={closeMenu}>
                Learn more
              </Link>
            </li>
            <li>
              <Link to="/about" className="nav-link" onClick={closeMenu}>
                List your car
              </Link>
            </li>
            <li>
              <Link to="/contact" className="nav-link" onClick={closeMenu}>
                Inbox
              </Link>
            </li>
            <li className="nav-icon-desktop">
              <img
                src="https://dv0eqz2t0y9gj.cloudfront.net/drivelah/b-landing/renters-img.webp"
                alt="User"
                className="nav-icon"
              />
            </li>
          </ul>
        </div>
      </nav>
      {isMenuOpen && <div className="menu-overlay" onClick={closeMenu}></div>}
    </>
  );
}

export default Navigation;
