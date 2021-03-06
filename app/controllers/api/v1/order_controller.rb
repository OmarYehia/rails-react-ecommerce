class Api::V1::OrderController < ApplicationController
  def index
    orders = Order.where(user_id: params[:user_id])
    if orders.length > 0
    render json: {
      success: true,
      totalRecords: orders.length,
      data: (ActiveModel::ArraySerializer.new(orders, each_serializer: OrderSerializer))
    }, status: 200
    else
      render json: {
        success: false,
        error: "No orders available for this user"
      }, status: 404
    end
  end

  def create
    flag = true
    orderItems = params[:orderItems]
    order = Order.new
    order.user_id = params[:id]
    if order.save()
      for item in orderItems do
        orderItem = OrderItem.new
        product = Product.find_by(id: item[:id])
        if item[:quantity].to_i <= product.quantity
          orderItem.price = item[:quantity].to_i * product.price
          orderItem.quantity = item[:quantity].to_i
          orderItem.order_id = order.id
          orderItem.product_id = product.id
  
          if !orderItem.save()
            flag = false
          end
         
        end
      end   
        
      
      if flag 
        render json: {
          success: true,
          message: "Order created successfully",
          data: OrderSerializer.new(order)
        }, status: 201
      else
        order.delete
        render json: {
          success: false,
          errors: order.errors
        }, status: 400
      end
      
        
    end
      rescue Exception => e
        render json: {
          success: false,
          errors: e.message
        }, status: 500
    end
  
   
  def get_order_items
    orderItems = OrderItem.all
    res = []
    for item in orderItems do
      if item.product.store_id == params[:id].to_i
        res.push(item)
      end
    end
    if res.length > 0
      render json: {
        success: true,
        data: (ActiveModel::ArraySerializer.new(res, each_serializer: OrderItemSerializer))
      }, status: 200
    else
      render json: {
        success: false,
        error: "No orders available for this user"
      }, status: 404
    end
  end

  def approve
    orderItem = OrderItem.find_by(id: params[:id])
    byebug
    if orderItem
      orderItem.state = "approved"
      orderItem.save
      render json: {
        success: true,
      }, status: 202
    else
      render json: {
        success: false,
        error: "Order item not found"
      }, status: 404
    end
  end

  def decline
    orderItem = OrderItem.find_by(id: params[:id])
    if orderItem
      orderItem.state = "declined"
      orderItem.save
      render json: {
        success: true,
      }, status: 202
    else
      render json: {
        success: false,
        error: "Order item not found"
      }, status: 404
    end
  end

  private
  def orderItem_params
    params.permit(:quantity, :price, :state, :order_id)
  end
  def order_params
    params.permit(:user_id)
  end
end
