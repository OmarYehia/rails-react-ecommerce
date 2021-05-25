class Product < ApplicationRecord 
    include Rails.application.routes.url_helpers

    belongs_to :brand
    has_many :order_items

    has_one_attached :image, dependent: :destroy
    validates :title, presence: true
    validates :description, presence: true 
    validates :price, presence: true, numericality: true
    validates :quantity, presence: true, numericality: { only_integer: true }
    validates :image, presence: true, blob: { content_type: ['image/jpg', 'image/jpeg', 'image/png'] }


    def get_image_url
        self.image.service_url
    end
end