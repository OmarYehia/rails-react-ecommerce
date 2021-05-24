class CreateProducts < ActiveRecord::Migration[5.2]
  def change
    create_table :products do |t|
      t.string :title
      t.text :description
      t.integer :quantity
      t.float :price
      
      t.timestamps
    end
  end
end
