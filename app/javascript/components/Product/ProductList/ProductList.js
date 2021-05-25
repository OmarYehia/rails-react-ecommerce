import React, { useEffect, useState } from "react";
import './ProductList.css'
import ProductCard from '../ProductCard/ProductCard'
import { Link, useParams } from "react-router-dom";

const ProductList = () => {
    const { brandId } = useParams();
    const [products, setProducts] = useState(null);

    useEffect(() => {
        fetch(`/api/v1/brands/${brandId}/products`)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            setProducts(data.data)
        })
        .catch((err) => {
            console.log(err);
        })
    }, [])

    return(
        <div>
            <h1>Products</h1>
            <div className="product-container">
                {
                    products && 
                    products.map((product) => (
                        <Link
                            className="card-cont"
                            to={`products/${product.id}`}
                            key={product.id}
                        >
                        <ProductCard product={product} />
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default ProductList;