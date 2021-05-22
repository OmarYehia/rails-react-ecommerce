class OrderItemSerializer < ActiveModel::Serializer
  attributes :id, :state, :price, :quantity, :order_id
end
