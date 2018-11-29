class AuthorSerializer < ActiveModel::Serializer
  attributes :id, :name, :username, :email, :books

  has_many :books
end
