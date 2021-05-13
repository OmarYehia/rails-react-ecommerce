class Category < ApplicationRecord
    include Rails.application.routes.url_helpers

    has_many :brands, dependent: :nullify
    has_one_attached :image, dependent: :destroy
    validates :name, presence: true, uniqueness: true
    validates :image, presence: true, blob: { content_type: ['image/jpg', 'image/jpeg', 'image/png'] }

    def get_image_url
        self.image.service_url
    end
end
