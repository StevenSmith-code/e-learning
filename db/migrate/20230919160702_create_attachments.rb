class CreateAttachments < ActiveRecord::Migration[7.0]
  def change
    create_table :attachments, id: :uuid do |t|
      t.string :name
      t.text :url
      t.uuid :course_id
      t.datetime :created_at, default: -> { "CURRENT_TIMESTAMP" }
      t.datetime :updated_at
      t.index :course_id
    end
  end
end
