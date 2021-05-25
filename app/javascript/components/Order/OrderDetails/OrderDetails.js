import React, { useEffect, useState } from 'react';

const OrderDetails = ({ orderItem, order }) => {
    const [product, setProduct] = useState(null);


    useEffect(()=>{
      fetch(`/api/v1/products/${orderItem.product_id}`)
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

    
    
    return (
        <div key={orderItem.id}>
            {product && <div className="card-item row" id={orderItem.id}>
            <div className="col-2">
                <img src={product.imageUrl} height="120" width="120"/>
            </div>
            <div className="col-2">
                <p>{product.title}</p>
            </div>
            <div className="col-2">
                <p>{orderItem.quantity}</p>
            </div>
            <div className="col-2">
                <p>{orderItem.price}</p>
            </div>
            <div className="col-2">
                <p>{orderItem.state}</p>
            </div>
            <div className="col-2">
                <p>{order.created_at}</p>
            </div>
            
        </div>}
        
        </div>
    )
}

export default OrderDetails;

