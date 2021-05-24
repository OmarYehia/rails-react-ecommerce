class CreateStores < ActiveRecord::Migration[5.2]
  def change
    create_table :stores do |t|
      t.string :name, null: false, unique: true
      t.belongs_to :user, foreign_key: true, index: true

      t.timestamps
    end
  end
end
