class CourseSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :content_link, :image_url, :price, :duration
  belongs_to :instructor
  
end
