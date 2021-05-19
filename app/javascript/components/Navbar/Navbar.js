import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

const Navbar = () => {
  const [cookies, setCookies] = useCookies();

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
        <Link to="#">Contact us</Link>
      </div>
      {!cookies.jwt && (
        <div className="navbar-items">
          <Link to="/login" className="btn btn-sm btn-dark loginBtn">
            Login
          </Link>
        </div>
      )}
      {cookies.jwt && (
        <div className="navbar-items">
          <Link to="#">
            <i className="fas fa-user"></i>
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
