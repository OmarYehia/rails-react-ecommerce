import React from "react";
import "./StoreCard.css";

const StoreCard = ({ store }) => {
  return (
    <div className="card category-card shadow-sm">
      {store && <p><strong>Store name:</strong> {store.name}</p>}
      {store && <p><strong>Summary:</strong> {store.summary}</p>}
      {store && <p><strong>Contact Info</strong></p>}
      {store && <p><strong>Owner Email:</strong> {store.owner.email}</p>}
      {store && <p>{store.summary}</p>}
    </div>
  );
};

export default StoreCard;
