class ChangeCompletionPercentageToIsCompletedInEnrollments < ActiveRecord::Migration[7.0]
  def change
    rename_column :enrollments, :completion_percentage, :is_completed_temp
    
    # Use an SQL snippet to change the column type with explicit casting
    execute <<-SQL
      ALTER TABLE enrollments
      ALTER COLUMN is_completed_temp
      TYPE boolean
      USING CASE WHEN is_completed_temp = 100 THEN true ELSE false END
    SQL
    
    # Rename the temporary column back to the desired name
    rename_column :enrollments, :is_completed_temp, :is_completed
  
    # Optionally, if you wish to set a default value:
    change_column_default :enrollments, :is_completed, false
  end
  
end
