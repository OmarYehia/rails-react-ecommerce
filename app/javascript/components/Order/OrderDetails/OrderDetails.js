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
            {product && <div className="card-item" id={orderItem.id}>
                <div className="row  align-items-center pt-3 pb-2 ">
                <div className="item pr-2 col-2"> <img src={product.imageUrl} alt=".." width="150" height="150"/> 
                </div>
                <div className="col-2"> <b className="h5">{product.title}</b></div>
                <div className="col-2"> <b>{orderItem.quantity}</b></div>
                <div className="col-2"> <b className="h5">{orderItem.price}$</b> </div>
                <div className="col-2"> <p className="h5">{orderItem.state}</p> </div>
                <div className="col-2"> <p className="">{order.created_at.created_at}</p> </div>
           
            </div>
            
        </div>}
        
        </div>
    )
}

export default OrderDetails;

