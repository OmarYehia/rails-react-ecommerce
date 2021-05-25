class StoreSerializer < ActiveModel::Serializer
  attributes :id, :name, :summary, :owner, :created_at

  def owner
    return {
      ownerId: object.user.id,
      username: object.user.username,
      email: object.user.email
    }
  end

  def created_at
    object.created_at.strftime("%A, %B %d %Y")
  end

end
