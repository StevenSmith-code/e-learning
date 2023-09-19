class CreateMuxData < ActiveRecord::Migration[7.0]
  def change
    create_table :mux_data do |t|

      t.timestamps
    end
  end
end
