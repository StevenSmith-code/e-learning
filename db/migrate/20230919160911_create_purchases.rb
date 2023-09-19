class CreatePurchases < ActiveRecord::Migration[7.0]
  def change
    create_table :purchases, id: :uuid do |t|
      t.uuid "user_id"
      t.uuid "course_id"
      t.datetime "created_at", default: -> { "CURRENT_TIMESTAMP" }
      t.datetime "updated_at"
      t.index ["course_id"]
      t.index ["user_id", "course_id"], unique: true
    end
  end
end
