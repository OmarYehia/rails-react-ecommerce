class OrderSerializer < ActiveModel::Serializer
  attributes :id, :user_id ,:order_items, :created_at

end

