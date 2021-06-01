import React, { useEffect, useState } from "react";
import StoreCard from "../StoreCard/StoreCard";
import "./StoreList.css";
import { Link, useHistory } from "react-router-dom";

const StoreList = ({ title }) => {
  const [stores, setStores] = useState(null);
  const [filteredStores, setfilteredStores] = useState(null);
  const history = useHistory();

  useEffect(() => {
    fetch(`/api/v1/stores`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let stores = data.data;
        setStores(stores);
        setfilteredStores(stores);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSearch = (e) => {
    let FilteredStores = stores.filter(
      (store) =>
        store.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1
    );
    setfilteredStores(FilteredStores);
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
        <Link
          className="ms-auto btn btn-primary btn-sm"
          // onClick={history.goBack}
          to="/"
        >
          Homepage
          </Link>
      </div>
      <fieldset className="border p-2 shadow-sm">
        <legend>{title}</legend>
        <div className="category-container">
          {filteredStores && filteredStores.length == 0 && (
            <h2 className="not-found">No categories found</h2>
          )}
          {filteredStores &&
            filteredStores.map((store) => (
              <Link
                className="card-cont"
                to={`/stores/${store.id}/products`}
                key={store.id}
              >
                <StoreCard store={store} />
              </Link>
            ))}
        </div>

      </fieldset>
    </div>
  );
};

export default StoreList;
