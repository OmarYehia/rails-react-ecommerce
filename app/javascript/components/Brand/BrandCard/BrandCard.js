import React from "react";
import "./BrandCard.css";

const BrandCard = ({ brand }) => {
  return (
    <div className="card brand-card shadow-sm">
      {brand && <img className="brand-image" src={brand.imageUrl} />}
      <div className="card-body">
        {brand && <p className="card-text">{brand.name}</p>}
      </div>
    </div>
  );
};

export default BrandCard;
