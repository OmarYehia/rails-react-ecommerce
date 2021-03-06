import React, { useEffect, useState } from "react";
import CategoryCard from "../CategoryCard/CategoryCard";
import "./CategoryList.css";
import { Link, useHistory } from "react-router-dom";

const CategoryList = ({ title, featured }) => {
  const [categories, setCategories] = useState(null);
  const [filteredCategories, setFilteredCategories] = useState(null);
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
        setFilteredCategories(categories);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSearch = (e) => {
    let filteredCategories = categories.filter(
      (category) =>
        category.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1
    );
    setFilteredCategories(filteredCategories);
  };

  return (
    <div>
      {!featured && (
        <div className="d-flex align-items-center mt-4 mb-3">
          <div className="me-3">
            <label htmlFor="search">Search</label>
          </div>
          <div className="">
            <input
              type="text"
              className="form-control"
              onChange={(e) => handleSearch(e)}
            />
          </div>
          <Link
            className="ms-auto btn btn-primary btn-sm"
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
          {filteredCategories && filteredCategories.length == 0 && (
            <h2 className="not-found">No categories found</h2>
          )}
          {filteredCategories &&
            filteredCategories.map((category) => (
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
