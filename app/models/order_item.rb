class OrderItem < ApplicationRecord
    attribute :state, :string, default: -> {"pending"}
    enum state: {
        pending: 'pending',
        confirmed: 'confirmed',
        delivered: 'delivered',
      }

      belongs_to :order
end
