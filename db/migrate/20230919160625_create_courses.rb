class CreateCourses < ActiveRecord::Migration[7.0]
  def change
    create_table :courses, id: :uuid do |t|
      t.uuid :user_id
      t.text :title
      t.text :description
      t.text :image_url
      t.float :price
      t.boolean :is_published, default: false
      t.uuid :category_id
      t.datetime :created_at, default: -> { "CURRENT_TIMESTAMP" }
      t.datetime :updated_at
      t.index :category_id
    end
  end
end
