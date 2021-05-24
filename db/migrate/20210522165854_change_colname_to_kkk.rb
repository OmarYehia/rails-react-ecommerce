class ChangeColnameToKkk < ActiveRecord::Migration[5.2]
  def change
    rename_column :order_items, :orders_id, :order_id

  end
end
