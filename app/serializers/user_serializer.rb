class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :role, :is_admin
end
