import React, { useEffect, useState } from "react";
import CategoryCard from "../CategoryCard/CategoryCard";
import "./CategoryList.css";
import { Link, useHistory } from "react-router-dom";

const CategoryList = ({ title, featured }) => {
  const [categories, setCategories] = useState(null);
  const history = useHistory();

  useEffect(() => {
    fetch(`/api/v1/categories`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let categories = data.data;
        if (featured) {
          categories = categories.slice(0, +featured);
        }
        setCategories(categories);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      {!featured && (
        <div className="d-flex">
          <Link
            className="ms-auto btn btn-primary btn-sm mt-5"
            // onClick={history.goBack}
            to="/"
          >
            Homepage
          </Link>
        </div>
      )}
      <fieldset className="border p-2 shadow-sm">
        <legend>{title}</legend>
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
        {featured && (
          <div className="d-flex">
            <Link className="ms-auto" to="/categories">
              More ...
            </Link>
          </div>
        )}
      </fieldset>
    </div>
  );
};

export default CategoryList;
