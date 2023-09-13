class Course < ApplicationRecord
  belongs_to :instructor, class_name: 'User'
  has_many :enrollments
  has_many :students, through: :enrollments, source: :student
  has_one_attached :image_url
  # ... other associations and methods ...
end
