class ProductSerializer < ActiveModel::Serializer
    attributes :id, :title, :description, :quantity, :price, :imageUrl
  
    def imageUrl
      object.get_image_url
    end
  end
  