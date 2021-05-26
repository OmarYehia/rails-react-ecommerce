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
           <div id="cart" className="bg-white rounded">
           <div className="d-flex justify-content-between align-items-center">
                      <div className="h6">Cart Summary</div>
                     
                  </div>
           {items && items.map((item) => (
              
                <div>
               
                  <div className="d-flex jusitfy-content-between align-items-center pt-3 pb-2 border-bottom">
                      <div className="item pr-2"> <img src={item.imageUrl}  alt=".." width="80" height="80"/>
                          <div className="number">2</div>
                      </div>
                      {item && <div className="d-flex flex-column px-3"> <b className="h5">{item.title}</b></div>}
                      {item &&<div className="ml-auto"> <b className="h5">{item.price}</b> </div>}
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
           <div className="d-flex align-items-center py-2">
                      <div className="display-5">Total</div>
                      <div className="ml-auto d-flex">
                          <div className="text-primary text-uppercase px-3">$</div>
                          <div className="font-weight-bold">{price}</div>
                      </div>
                  </div>
            </div>
       </div>
    )
}

export default Cart