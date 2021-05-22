import React, { useEffect, useState } from 'react';
import CartItem from '../CartItem/CartItem';

const CartList = () => {
    const [products, setProducts] = useState(null);
    const [cart, setCart] = useState(localStorage.getItem('cart'))
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(()=>{
        if (cart){
            const cartArray = cart.split(",");
            console.log(cartArray);
            setProducts(cartArray);
        }
    }, [cart])

    const handleCheckout = async () => {
        const orderItems = []
        const items = document.querySelectorAll(".card-item")
        items.forEach(item => {
            const orderItem = {
                id: item.id,
                qt: item.children[2].firstChild.value
            }
            orderItems.push(orderItem)
        });

        const res = await fetch("/api/v1/orders", {
            method: "POST",
            headers: {
                "X-CSRF-TOKEN": document.querySelector('[name="csrf-token"]').content,
                Authorization: `Bearer ${cookies.Authorization}`,
            },
            body: JSON.stringify(orderItems)
        })

        const jsonRes = await res.json();

    }

    return (
        <div className="cart-list">
            {!products && <div>Shopping cart is empty</div>}
            {products && 
            products.map(product => (
                <CartItem key={product} productId={product} setCart={setCart} totalPrice={totalPrice} setTotalPrice={setTotalPrice}/>
            ))}
           <button className="btn btn-primary" onClick={handleCheckout}>Checkout</button>
        </div>
    )
}

export default CartList;