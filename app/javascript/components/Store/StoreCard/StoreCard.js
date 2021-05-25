import React from "react";
import "./StoreCard.css";

const StoreCard = ({ store }) => {
  return (
    <div className="card category-card shadow-sm">
      {store && <h3>Store name: {store.name}</h3>}
      {store && <h3>Summary: {store.summary}</h3>}
      {store && <h3>Owner Email: {store.owner.email}</h3>}
      {store && <h3>{store.summary}</h3>}
    </div>
  );
};

export default StoreCard;
