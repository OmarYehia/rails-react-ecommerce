class AddConstraints < ActiveRecord::Migration[5.2]
    def self.up
      execute "ALTER TABLE users ADD CONSTRAINT unique_email unique (email)"
    end
end
