import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = ({user, logout}) => {
  return (
    <div className="navbar-container shadow-sm px-3 py-1 d-flex align-items-center justify-content-between">
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
        <Link to="/stores">Stores</Link>
        <Link to="#">About us</Link>
      </div>
      {!user && (
        <div className="navbar-items">
          <Link to="/login" className="btn btn-sm btn-dark loginBtn">
            Login
          </Link>
          -
          <Link to="/signup" className="btn btn-sm btn-dark loginBtn">
            Register
          </Link>
        </div>
      )}
      {user && (
        <div className="navbar-items">
          <Link to="/profile/edit">
            <i className="fas fa-user"></i>
            {user.username}
          </Link>
          <Link to="/cart">
            <i className="fas fa-shopping-cart"></i>
          </Link>
          <Link to="/orders">
          <i className="fas fa-shopping-bag"></i>
          </Link>
          <Link to="#" className="btn btn-sm btn-dark loginBtn" onClick={logout}>
            Logout
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
