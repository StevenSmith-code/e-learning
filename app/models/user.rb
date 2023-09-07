class User < ApplicationRecord
  enum role: { student: 0, instructor: 1 }
    has_many :courses, foreign_key: 'instructor_id'
    has_many :enrollments, foreign_key: 'student_id'
    has_secure_password
    validates :username, presence: true, uniqeness: true
    validates :email, presence: true
    validates :password, presence: true, length: {minimum:6, maximum:20}
  end
  