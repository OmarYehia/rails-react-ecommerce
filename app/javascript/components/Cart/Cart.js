import React from 'react'
import './Cart.css'

const Cart = () => {
    return (
       <div>
              <div id="cart" class="bg-white rounded">
              <div class="d-flex justify-content-between align-items-center">
                    <div class="h6">Cart Summary</div>
                    <div class="h6"> <a href="#">Edit</a> </div>
                </div>
                <div class="d-flex jusitfy-content-between align-items-center pt-3 pb-2 border-bottom">
                    <div class="item pr-2"> <img src="https://images.unsplash.com/photo-1569488859134-24b2d490f23f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="" width="80" height="80"/>
                        <div class="number">2</div>
                    </div>
                    <div class="d-flex flex-column px-3"> <b class="h5">BattleCreek Coffee</b> <a href="#" class="h5 text-primary">C-770</a> </div>
                    <div class="ml-auto"> <b class="h5">$80.9</b> </div>
                </div>

                <div class="d-flex align-items-center">
                    <div class="display-5">Subtotal</div>
                    <div class="ml-auto font-weight-bold">$80.9</div>
                </div>
                <div class="d-flex align-items-center py-2 border-bottom">
                    <div class="display-5">Shipping</div>
                    <div class="ml-auto font-weight-bold">$12.9</div>
                </div>
                <div class="d-flex align-items-center py-2">
                    <div class="display-5">Total</div>
                    <div class="ml-auto d-flex">
                        <div class="text-primary text-uppercase px-3">usd</div>
                        <div class="font-weight-bold">$92.98</div>
                    </div>
                </div>
              </div>
       </div>
    )
}

export default Cart