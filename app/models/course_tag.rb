class CourseTag < ApplicationRecord
    belongs_to :course
    belongs_to :tag
    validates :course, uniqueness: { scope: :tag }
  end