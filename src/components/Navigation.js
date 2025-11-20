import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

function Navigation() {
  return (
    <nav className="navigation">
      <div className="nav-container">
        <img
          src="https://www.drivelah.sg/static/media/newLogo.17a5a13f.png"
          alt="Drive lah"
          className="nav-logo"
        />
        <ul className="nav-menu">
          <li>
            <Link to="/" className="nav-link">
              Learn more
            </Link>
          </li>
          <li>
            <Link to="/about" className="nav-link">
              List your car
            </Link>
          </li>
          <li>
            <Link to="/contact" className="nav-link">
              Inbox
            </Link>
          </li>
          <li>
            <img
              src="https://dv0eqz2t0y9gj.cloudfront.net/drivelah/b-landing/renters-img.webp"
              alt="Bell"
              className="nav-icon"
            />
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
