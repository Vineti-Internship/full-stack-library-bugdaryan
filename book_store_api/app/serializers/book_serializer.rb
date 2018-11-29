class BookSerializer < ActiveModel::Serializer
  attributes :id, :title, :genre, :description, :rating, :author
  belongs_to :author
end
