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
        const cart = JSON.parse(localStorage.getItem("cart"))
        console.log("cartfeldelete", cart)
     //   const cartArray = cart.split(",");
        const newArray = cart.filter(item => item != id)
        localStorage.setItem("cart", JSON.stringify(newArray))
        setCart(newArray)
    }

    return (
        <div className="cart-item" key={productId}>
            {product && <div className="card-item row" id={product.id}>
            <div className="row  align-items-center pt-3 pb-2 border-bottom">
                <div className="item pr-2 col-2"> <img src={product.imageUrl}  alt=".." width="150" height="150"/>       
                </div>
                <div className="col-3"> <b className="h5">{product.title}</b></div>
                <div className="col-3">  { <input type="number"  value={quantity} min={1}  max={product.quantity} onChange={(e)=>setQuantity(e.target.value)}/> }</div>
                <div className="col-2"> <b className="h5">{product.price * quantity}$</b> </div>
                <div className="col-2">  <p onClick={() => handleDelete(product.id)}><i className="btn btn-danger btn-sm far fa-trash-alt"></i></p> </div>
            </div>
            
        </div>}
        </div>
        
    )
}

export default CartItem;