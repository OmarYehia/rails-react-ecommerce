import React, { useEffect, useState } from "react";
import "./BrandList.css";
import { Link, useParams } from "react-router-dom";
import BrandCard from "../BrandCard/BrandCard";

const BrandList = () => {
  const { categoryId } = useParams();
  const [brands, setBrands] = useState(null);
  const [filteredBrands, setFilteredBrands] = useState(null);

  useEffect(() => {
    fetch(`/api/v1/categories/${categoryId}/brands`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setBrands(data.data);
        setFilteredBrands(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSearch = (e) => {
    let filteredBrands = brands.filter(
      (brand) =>
        brand.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1
    );
    setFilteredBrands(filteredBrands);
  };

  return (
    <div>
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
        <Link className="ms-auto btn btn-primary btn-sm" to="/categories">
          Back to Categories
        </Link>
      </div>
      <h1>Brands</h1>
      <div className="brand-container">
        {filteredBrands && filteredBrands.length == 0 && (
          <h2>No brands found</h2>
        )}
        {filteredBrands &&
          filteredBrands.map((brand) => (
            <Link
              className="card-cont"
              to={`${brand.name}/brands`}
              key={brand.id}
            >
              <BrandCard brand={brand} />
            </Link>
          ))}
      </div>
    </div>
  );
};

export default BrandList;
