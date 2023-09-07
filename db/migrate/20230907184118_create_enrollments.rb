class CreateEnrollments < ActiveRecord::Migration[7.0]
  def change
    create_table :enrollments do |t|
      t.references :student, null: false, foreign_key: true
      t.references :course, null: false, foreign_key: true
      t.boolean :is_active
      t.float :completion_percentage
      t.datetime :completed_at

      t.timestamps
    end
  end
end
