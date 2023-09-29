class Chapter < ApplicationRecord
    belongs_to :course
    acts_as_list scope: :course
 
  has_many :user_progresses

  has_one :mux_data
end
