import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="row container mt-5 p-5">
      <div className="col-5 d-flex align-items-center justify-content-center">
        <img src="https://png.pngtree.com/png-vector/20200116/ourmid/pngtree-man-with-confused-face-concept-for-expression-character-flat-style-vector-png-image_2129318.jpg" />
      </div>
      <div className="col-7 d-flex flex-column justify-content-center">
        <h1>We looked everywhere :(</h1>
        <p>Looks like the page is missing...</p>
        <Link to="/" className="btn btn-primary w-25">
          Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
