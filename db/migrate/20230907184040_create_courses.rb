class CreateCourses < ActiveRecord::Migration[7.0]
  def change
    create_table :courses do |t|
      t.string :title
      t.string :content_link
      t.decimal :price, precision: 8, scale: 2
      t.references :instructor, null: false, foreign_key: true
      t.text :description
      t.string :image_url
      t.integer :duration
      t.float :average_rating
      t.integer :total_reviews
      t.boolean :provides_certificate
      t.integer :status

      t.timestamps
    end
  end
end
