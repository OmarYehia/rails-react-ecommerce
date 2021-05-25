import React, { useEffect, useState } from 'react';
import "./CartItem.css";

const CartItem = ({ productId, setCart, totalPrice, setTotalPrice }) => {
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1)

    
    useEffect(()=>{
        fetch(`/api/v1/products/${productId}`)
        .then(res => {
            if(res.ok) {
                return res.json()
            } else {
                if (res.status === 404) {

                    throw Error("Notfound")
                }
            }
        })
        .then(data => {
            setProduct(data.data.product)
        })
        .catch(err=>{
            console.log(err);
        })
    }, [])

    const handleDelete = (id) => {
        const cart = localStorage.getItem('cart');
        console.log("cartfeldelete", cart)
        const cartArray = cart.split(",");
        const newArray = cartArray.filter(item => item != id)
        localStorage.setItem('cart', newArray.join(','))
        setCart(newArray)
    }

    return (
        <div className="cart-item" key={productId}>
            {product && <div className="card-item row" id={product.id}>
            <div className="col-3">
                <img src={product.imageUrl} height="150" width="150"/>
            </div>
            <div className="col-3">
                <p>{product.title}</p>
            </div>
            <div className="col-2">
                { <input type="number"  value={quantity} min={1}  max={product.quantity} onChange={(e)=>setQuantity(e.target.value)}/> }
               
            </div>
            <div className="col-2">
                { <p>{product.price * quantity}</p> }
                

            </div>
            <div className="col-1">
                <p onClick={() => handleDelete(product.id)}><i className="btn btn-danger btn-sm far fa-trash-alt"></i></p>
            </div>
        </div>}
        </div>
        
    )
}

export default CartItem;