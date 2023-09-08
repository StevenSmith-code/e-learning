class EnrollmentSerializer < ActiveModel::Serializer
  attributes :id, :student_id, :course_id, :is_active, :is_completed, :completed_at
end
