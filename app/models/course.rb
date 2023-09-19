class Course < ApplicationRecord
  belongs_to :category, optional: true
  has_many :chapters, dependent: :destroy
  has_many :attachments, dependent: :destroy
  has_many :purchases, dependent: :destroy
end
