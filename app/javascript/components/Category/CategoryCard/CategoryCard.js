import React from "react";
import "./CategoryCard.css";

const CategoryCard = ({ category }) => {
  return (
    <div className="card category-card shadow-sm">
      {category && <img className="category-image" src={category.imageUrl} />}
      <div className="card-body">
        {category && <p className="card-text">{category.name}</p>}
      </div>
    </div>
  );
};

export default CategoryCard;
