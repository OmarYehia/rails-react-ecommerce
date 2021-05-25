import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";



const ProductPage = () => {
    const {productId} = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetch(`/api/v1/products/${productId}`)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            setProduct(data.data.product)
        })
        .catch((err) => {
            console.log(err);
        })
    }, [])


    
    return (

        <div className="card mb-3">
            {product && <img src={product.imageUrl} className="card-img-top" alt="..." />}
            <div class="card-body">
               { product && <h5 className="card-title">Product: {product.title}</h5>}
                {product && <p className="card-text">Desription: {product.description}</p>}
                {product && <p className="card-text"><small className="text-muted">Price: ${product.price}</small></p>}
                {product && <p className="card-text"><small className="text-muted">Quantity: {product.quantity}</small></p>}

            </div>
            <div>
                <button className="btn-primary">
                    Order Now
                </button>
            </div>
        </div>

    )

}

export default ProductPage