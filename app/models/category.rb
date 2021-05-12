class Category < ApplicationRecord
    has_many :brands
    validates :name, presence: true
    validates :image, presence: true, blob: { content_type: ['image/jpg', 'image/jpeg', 'image/png'] }
end
