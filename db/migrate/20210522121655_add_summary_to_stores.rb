class AddSummaryToStores < ActiveRecord::Migration[5.2]
  def change
    add_column :stores, :summary, :text
  end
end
