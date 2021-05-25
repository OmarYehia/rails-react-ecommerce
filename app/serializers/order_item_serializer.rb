class OrderItemSerializer < ActiveModel::Serializer
  attributes :id, :state, :price, :quantity, :order_id, :product

  def product
    return {
      productName: object.product.title,
      stockQuantity: object.product.quantity
    }
  end
end
