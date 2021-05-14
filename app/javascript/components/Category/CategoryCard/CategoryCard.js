import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
    <div className="card category-card">
      {category && <img className="category-image" src={category.imageUrl} />}
      <div className="card-body">
        {category && (
          <Link
            to={`/api/v1/categories/${category.id}/brands`}
            className="card-text"
          >
            {category.name}
          </Link>
        )}
      </div>
    </div>
  );
};

export default CategoryCard;
