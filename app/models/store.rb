class Store < ApplicationRecord

    has_many :products, dependent: :destroy
    belongs_to :user, dependent: :destroy

    validates :name, presence: true, uniqueness: true
    validates :summary, presence: true

end
