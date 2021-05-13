class BrandSerializer < ActiveModel::Serializer
  attributes :id, :name, :category

  def category
    return {
      categoryId: object.category.id,
      categoryName: object.category.name,
      href: "#{root_url}api/v1/categories/#{object.category_id}"
    }
  end
end
