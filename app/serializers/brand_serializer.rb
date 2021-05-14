class BrandSerializer < ActiveModel::Serializer
  attributes :id, :name, :imageUrl, :category

  def imageUrl
    object.get_image_url
  end

  def category
    return {
      categoryId: object.category.id,
      categoryName: object.category.name,
      categoryImage: object.get_image_url,
      href: "#{root_url}api/v1/categories/#{object.category_id}"
    }
  end
end
