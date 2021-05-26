import React, { useEffect, useState } from 'react';
import OrderDetails from '../OrderDetails/OrderDetails';


const OrderItem = ({ order }) => {
    
    return (
        <div key={order.id}>
            
            { order.order_items.map(orderItem => (
              <OrderDetails key={orderItem.id} orderItem={orderItem} order={order} />
              
            ))}
           

        </div>
    )
}

export default OrderItem;