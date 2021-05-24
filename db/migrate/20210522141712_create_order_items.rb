class CreateOrderItems < ActiveRecord::Migration[5.2]
  def change
    create_table :order_items do |t|
      t.string :state
      t.float :price
      t.integer :quantity

      t.timestamps
    end
  end
end
