class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email
  has_many :enrollments
  has_many :courses
end
