import React, { useEffect, useState } from "react";
import CategoryCard from "../CategoryCard/CategoryCard";
import "./CategoryList.css";
import { Link } from "react-router-dom";

const CategoryList = () => {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    console.log(process.env.HOST);
    fetch(`api/v1/categories`)
      .then((res) => res.json())
      .then((data) => {
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
              to={`${category.name}/brands`}
              key={category.id}
            >
              <CategoryCard categoryId={category.id} />
            </Link>
          ))}
      </div>
    </div>
  );
};

export default CategoryList;
