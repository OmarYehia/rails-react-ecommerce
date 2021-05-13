class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :username                        ,null: false, default: "", unique: true
      t.string :password_digest                 ,null: false, default: "", unique: true
      t.string :email                           ,null: false, default: "", unique: true

      t.timestamps                               null: false


    end
  end
end
