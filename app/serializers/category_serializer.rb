class CategorySerializer < ActiveModel::Serializer
  attributes :id, :name, :imageUrl

  def imageUrl
    object.get_image_url
  end
end
