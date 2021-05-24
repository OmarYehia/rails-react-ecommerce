import React, { useEffect, useState } from 'react';

const CartItem = ({ productId, setCart, totalPrice, setTotalPrice }) => {
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(0)

    
    useEffect(()=>{
        fetch(`/api/v1/categories/${productId}`)
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
            setProduct(data.data.category)
        })
        .catch(err=>{
            console.log(err);
        })
    }, [])

    const handleDelete = (id) => {
        const cart = localStorage.getItem('cart');
        const cartArray =  cart.split(",")
        const newArray = cartArray.filter(item => item != id)
        localStorage.setItem('cart', newArray.join(','))
        setCart(newArray)
    }

    return (
        <div>
            {product && <div className="card-item row" id={product.id}>
            <div className="col-2">
                <img src={product.imageUrl} height="120" width="120"/>
            </div>
            <div className="col-4">
                <p>{product.name}</p>
            </div>
            <div className="col-2">
                {/* <input type="number" max={product.stockQuanitity} onChange={(e)=>setQuantity(e.target.value)}/> */}
                <input type="number" max="5" onChange={(e)=>{
                    setQuantity(e.target.value)
                }}/>

            </div>
            <div className="col-2">
                {/* <p>{product.price * quantity}</p> */}
                <p>
                    {20 * quantity}
                </p>

            </div>
            <div className="col-2">
                <button onClick={() => handleDelete(product.id)} className="btn btn-danger btn-sm">Delete</button>
            </div>
        </div>}
        </div>
    )
}

export default CartItem;