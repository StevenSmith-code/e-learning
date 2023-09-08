class CourseSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :content_link
  belongs_to :instructor

  def content_link
    Rails.logger.info "Current User ID: #{scope&.id}"
    Rails.logger.info "Course Students IDs: #{object.students.pluck(:id)}"
    
    if object.students.include?(scope)
      object.content_link
    else
      nil
    end
  end
  
end
