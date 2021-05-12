class CreateBrands < ActiveRecord::Migration[5.2]
  def change
    create_table :brands do |t|
      t.string :name
      t.belongs_to :category, foreign_key: true, index: true

      t.timestamps
    end
  end
end
