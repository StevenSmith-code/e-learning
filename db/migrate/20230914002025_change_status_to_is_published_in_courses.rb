class ChangeStatusToIsPublishedInCourses < ActiveRecord::Migration[6.0] # or your version of Rails
  def up
    # Add new column
    add_column :courses, :is_published_tmp, :boolean, default: false

    # Migrate data from old to new column
    Course.where(status: 1).update_all(is_published_tmp: true)

    # Remove old column
    remove_column :courses, :status

    # Rename new column to desired name
    rename_column :courses, :is_published_tmp, :is_published
  end

  def down
    # For rollback: Reverting the changes.
    add_column :courses, :status, :integer

    # Migrate data back to old column
    Course.where(is_published: true).update_all(status: 1)

    # Remove new column
    remove_column :courses, :is_published
  end
end
