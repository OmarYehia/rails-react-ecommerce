class OrderItem < ApplicationRecord
    attribute :state, :string, default: -> {"pending"}
    enum state: {
        pending: 'pending',
        approved: 'approved',
        declined: 'declined',
      }

      belongs_to :order
      belongs_to :product
end
