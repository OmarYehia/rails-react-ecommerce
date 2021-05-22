class Api::V1::OrderController < ApplicationController
  def index

  end

  def create
    order = Order.new()
    if order.save()
      orderItem = order.order_items.create(orderItem_params.merge(order_id: order.id))
      if orderItem.save()
        render json: {
          success: true,
          message: "OrderItem created successfully",
          data: OrderItemSerializer.new(orderItem)
        }, status: 201
      else
        order.delete
        render json: {
          success: false,
          errors: orderItem.errors
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
