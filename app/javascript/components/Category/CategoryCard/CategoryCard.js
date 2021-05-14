import React from "react";
import { useEffect, useState } from "react";
import "./CategoryCard.css";

const CategoryCard = ({ categoryId }) => {
  const [category, setCategory] = useState(null);

  useEffect(() => {
    fetch(`api/v1/categories/${categoryId}`)
      .then((res) => res.json())
      .then((data) => {
        setCategory(data.data.category);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
