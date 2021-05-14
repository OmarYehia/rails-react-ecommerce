import React, { useEffect, useState } from "react";
import CategoryCard from "../CategoryCard/CategoryCard";
import "./CategoryList.css";

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
    <div className="category-container">
      <h1>Categories</h1>
      {categories &&
        categories.map((category) => (
          <CategoryCard categoryId={category.id} key={category.id} />
        ))}
    </div>
  );
};

export default CategoryList;
