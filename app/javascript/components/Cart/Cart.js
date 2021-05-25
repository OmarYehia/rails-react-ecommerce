import React, {useState, useEffect} from 'react'
import './Cart.css'

const Cart = () => {
    const [items, setItems] = useState([])
    const [price, setPrice] = useState(0)
    
    let cartItems = JSON.parse(localStorage.getItem("cart"));
    

    

    useEffect(()=> {
        cartItems.forEach((item)=> {
            fetch(`/api/v1/products/${item}`)
            .then((res) =>{
                return res.json()
            })
            .then((data) => {
                setItems(items => [...items, data.data.product]);
                setPrice((old) => old+data.data.product.price)
            })
            .catch((err) => {
                console.log(err);
            })
        },[])
    }, [])
   

    useEffect(() => {
        console.log(price);
    }, [price])

    return (
       <div >
           <div id="cart" class="bg-white rounded">
           <div class="d-flex justify-content-between align-items-center">
                      <div class="h6">Cart Summary</div>
                     
                  </div>
           {items && items.map((item) => (
              
                <div>
               
                  <div class="d-flex jusitfy-content-between align-items-center pt-3 pb-2 border-bottom">
                      <div class="item pr-2"> <img src={item.imageUrl}  alt=".." width="80" height="80"/>
                          <div class="number">2</div>
                      </div>
                      {item && <div class="d-flex flex-column px-3"> <b class="h5">{item.title}</b></div>}
                      {item &&<div class="ml-auto"> <b class="h5">{item.price}</b> </div>}
                  </div>
  
                  {/* <div class="d-flex align-items-center">
                      <div class="display-5">Subtotal</div>
                      <div class="ml-auto font-weight-bold">$80.9</div>
                  </div>
                  <div class="d-flex align-items-center py-2 border-bottom">
                      <div class="display-5">Shipping</div>
                      <div class="ml-auto font-weight-bold">$12.9</div>
                  </div>
                   */}
          </div>
               
           )
           
             
           )}
           <div class="d-flex align-items-center py-2">
                      <div class="display-5">Total</div>
                      <div class="ml-auto d-flex">
                          <div class="text-primary text-uppercase px-3">$</div>
                          <div class="font-weight-bold">{price}</div>
                      </div>
                  </div>
            </div>
       </div>
    )
}

export default Cart