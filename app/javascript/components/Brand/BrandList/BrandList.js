import React, { useEffect, useState } from "react";
import "./BrandList.css";
import { Link, useParams } from "react-router-dom";
import BrandCard from "../BrandCard/BrandCard";

const BrandList = () => {
  const { categoryId } = useParams();
  const [brands, setBrands] = useState(null);

  useEffect(() => {
    fetch(`/api/v1/categories/${categoryId}/brands`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setBrands(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1>Brands</h1>
      <div className="brand-container">
        {brands &&
          brands.map((brand) => (
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
