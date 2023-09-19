class CreateMuxDatas < ActiveRecord::Migration[7.0]
  def change
    create_table :mux_datas, id: :uuid do |t|
      t.string "asset_id"
      t.string "playback_id"
      t.uuid "chapter_id", unique: true
      t.index ["chapter_id"]
    end
  end
end
