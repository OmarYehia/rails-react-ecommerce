import React, { useEffect, useState } from "react";
import CategoryCard from "../CategoryCard/CategoryCard";
import "./CategoryList.css";

const CategoryList = () => {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    console.log("Hello");
    fetch(`${process.env.HOST}api/v1/categories`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="category-container">
      <h1>Categories</h1>
      {categories.map((category) => (
        <CategoryCard categoryId={category.id} />
      ))}
    </div>
  );
};

export default CategoryList;
