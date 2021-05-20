import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = ({ user }) => {
  return (
    <div className="navbar-container shadow-sm px-3 py-1 d-flex align-items-center">
      <Link to="/" style={{ textDecoration: "none" }}>
        <div className="logo">
          <span>e</span>
          <span style={{ color: "red" }}>R</span>
          <span style={{ color: "orange" }}>a</span>
          <span style={{ color: "blue" }}>i</span>
          <span style={{ color: "green" }}>l</span>
          <span style={{ color: "purple" }}>s</span>
        </div>
      </Link>
      <div className="navbar-links">
        <Link to="/categories">Categories</Link>
        <Link to="#">Brands</Link>
        <Link to="#">About us</Link>
      </div>
      {!user && (
        <div className="navbar-items">
          <Link to="/login" className="btn btn-sm btn-dark loginBtn">
            Login
          </Link>
        </div>
      )}
      {user && (
        <div className="navbar-items">
          <Link to="#">
            <i className="fas fa-user"></i>
            {user.username}
          </Link>
          <Link to="#">
            <i className="fas fa-shopping-cart"></i>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
