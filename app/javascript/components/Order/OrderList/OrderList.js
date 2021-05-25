import React, { useEffect, useState } from 'react';
import OrderItem from '../OrderItem/OrderItem';

const OrderList = ({user}) => {
    const [orders, setOrders] = useState(null);

    useEffect(()=>{
        fetch(`/api/v1/orders/${user.id}`)
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
            setOrders(data.data)

        })
        .catch(err=>{
            console.log(err);
        })
    }, [])

    return (
        <div className="order-list">
           
            {!orders && <div>You have No Orders</div>}
            {orders && 
            orders.map(order => (
                <div>
                    <h1>{order.id}</h1>
                <OrderItem key={order.id} order={order} />
                <hr/>
                </div>
            ))}
        
        </div>
    )
}

export default OrderList;