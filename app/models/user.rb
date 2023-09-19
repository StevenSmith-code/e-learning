class User < ApplicationRecord
  has_many :courses
  has_many :purchases
  has_many :user_progresses
  has_one :stripe_customer
  end
  