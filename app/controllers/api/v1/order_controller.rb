class Api::V1::OrderController < ApplicationController
  def index
    orderItems = Order.all.order(:created_at)
    render json: {
      success: true,
      totalRecords: orderItems.length,
      data: (ActiveModel::ArraySerializer.new(orderItems, each_serializer: OrderItemSerializer))
    }, status: 200

  end

  def create
    flag = true
    orderItems = params[:orderItems]
    order = Order.new()
    if order.save()
      for item in orderItems do
        orderItem = OrderItem.new
        product = Product.find_by(id: item[:id])
        orderItem.price = item[:quantity] * product.price
        orderItem.quantity = item[:quantity]
        orderItem.order_id = order.id

        if !orderItem.save()
          flag = false
        end
      end   
      
      if flag 
        render json: {
          success: true,
          message: "OrderItems created successfully",
          data: order
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
  
   
  def show
  end

  private
  def orderItem_params
    params.permit(:quantity, :price, :state, :order_id)
  end
end
