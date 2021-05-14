import React, { useEffect, useState } from "react";
import CategoryCard from "../CategoryCard/CategoryCard";
import "./CategoryList.css";
import { Link } from "react-router-dom";

const CategoryList = () => {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    fetch(`/api/v1/categories`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setCategories(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1>Categories</h1>
      <div className="category-container">
        {categories &&
          categories.map((category) => (
            <Link
              className="card-cont"
              to={`/categories/${category.id}/brands`}
              key={category.id}
            >
              <CategoryCard category={category} />
            </Link>
          ))}
      </div>
    </div>
  );
};

export default CategoryList;
