class CreateChapters < ActiveRecord::Migration[7.0]
  def change
    create_table :chapters, id: :uuid do |t|
      t.string "title"
      t.text "description"
      t.text "video_url"
      t.integer "position"
      t.boolean "is_published", default: false
      t.boolean "is_free", default: false
      t.uuid "course_id"
      t.datetime "created_at", default: -> { "CURRENT_TIMESTAMP" }
      t.datetime "updated_at"
      t.index ["course_id"]
    end
  end
end
