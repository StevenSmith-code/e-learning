class CreateUserProgresses < ActiveRecord::Migration[7.0]
  def change
    create_table :user_progresses, id: :uuid do |t|
      t.uuid "user_id"
      t.uuid "chapter_id"
      t.boolean "is_completed", default: false
      t.datetime "created_at", default: -> { "CURRENT_TIMESTAMP" }
      t.datetime "updated_at"
      t.index ["chapter_id"]
      t.index ["user_id", "chapter_id"], unique: true
    end
  end
end
