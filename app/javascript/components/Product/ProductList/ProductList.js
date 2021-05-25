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

    const [cart, setCart] = useState([]);
    
    useEffect(() => {
        console.log(cart)
        localStorage.setItem("cart", JSON.stringify(cart))
    }, [cart])

    const addToCart = id => {
        // setCart([...cart, product.id]);
        setCart(cart => [...cart, id.id]);
        console.log(`This is the Id of the current Tagged product => ${id.id}`);
        
        // localStorage.setItem("Cart", temp )
        
    }

    return(
        <div>
            <h1>Products</h1>
            <div className="product-container">
                {
                    products && 
                    products.map((product) => (
                        <div
                            className="card-cont"
                            to={`products/${product.id}`}
                            key={product.id}
                        >
                        <ProductCard product={product} addToCart={addToCart} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default ProductList;