import { Button } from "bootstrap";
import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const quantityOfProduct = product.quantity;

  return (
    <div className="card product-card shadow-sm">
      {product && <img className="product-image" src={product.imageUrl} />}
      <div className="card-body">
        <div>
          {product && <div className="card-text">{product.title}</div>}
        </div> 
        <div>
          {product && <div className="card-text">{product.description}</div>}
        </div>
        <div>
          {product && <div className="card-text"><strong>${product.price}</strong></div>}
        </div>

        {/* Conditonal Rendering here to see if there are products in the stock or not! */}

        {quantityOfProduct > 0 ? <div>
          {product && <div className="card-text">IN STOCK: {product.quantity}</div>}
        </div> : <div>
          {product && <div className="card-text">Out of Stock</div>}
        </div>}
       <div>
          <button className="btn-primary">
            Order Now
          </button>
          <button className="btn-secondary">
            Add to Cart
          </button>
       </div>
      </div>
    </div>
  );
};

export default ProductCard;
