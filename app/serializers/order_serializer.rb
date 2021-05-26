class OrderSerializer < ActiveModel::Serializer
  attributes :id, :user_id ,:order_items, :created_at

  def created_at
    return {
       created_at: object.created_at.strftime("%Y-%m-%d %H:%M")
    }
    
  end
 
end

