class AddOrderToOrderitem < ActiveRecord::Migration[5.2]
  def change
    add_reference :order_items, :orders, foreign_key: true
  end
end
