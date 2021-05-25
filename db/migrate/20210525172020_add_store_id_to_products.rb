class AddStoreIdToProducts < ActiveRecord::Migration[5.2]
  def change
    add_reference :products, :store, foreign_key: true
  end
end
