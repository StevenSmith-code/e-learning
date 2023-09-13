class CourseSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :content_link, :image_url, :price, :duration, :created_at, :updated_at
  belongs_to :instructor
  
  def image_url
    rails_blob_url(object.image_url) if object.image_url.attached?
  end
end
