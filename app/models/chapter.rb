class Chapter < ApplicationRecord
    belongs_to :course
    has_one :mux_data, dependent: :destroy
    has_many :user_progresses, dependent: :destroy
end
