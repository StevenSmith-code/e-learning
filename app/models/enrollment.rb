class Enrollment < ApplicationRecord
  belongs_to :student, class_name: 'User'
  belongs_to :course
  # ... other associations and methods ...
end
