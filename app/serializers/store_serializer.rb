class StoreSerializer < ActiveModel::Serializer
  attributes :id, :name, :summary, :owner

  def owner
    return {
      ownerId: object.user.id,
      username: object.user.username,
    }
  end
end
