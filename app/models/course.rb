class Course < ApplicationRecord
  belongs_to :category, optional: true
  has_many :chapters
  has_many :attachments
  has_many :purchases
end
