# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_09_19_160941) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "pgcrypto" if adapter_name == "PostgreSQL" # UUID support for PostgreSQL
  
  create_table "attachments", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name"
    t.text "url"
    t.uuid "course_id"
    t.datetime "created_at", default: -> { "CURRENT_TIMESTAMP" }
    t.datetime "updated_at"
    t.index ["course_id"], name: "index_attachments_on_course_id"
  end

  create_table "categories", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name"
  end

  create_table "chapters", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "title"
    t.text "description"
    t.text "video_url"
    t.integer "position"
    t.boolean "is_published", default: false
    t.boolean "is_free", default: false
    t.uuid "course_id"
    t.datetime "created_at", default: -> { "CURRENT_TIMESTAMP" }
    t.datetime "updated_at"
    t.index ["course_id"], name: "index_chapters_on_course_id"
  end

  create_table "courses", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "user_id"
    t.text "title"
    t.text "description"
    t.text "image_url"
    t.float "price"
    t.boolean "is_published", default: false
    t.uuid "category_id"
    t.datetime "created_at", default: -> { "CURRENT_TIMESTAMP" }
    t.datetime "updated_at"
    t.index ["category_id"], name: "index_courses_on_category_id"
  end

  create_table "mux_datas", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "asset_id"
    t.string "playback_id"
    t.uuid "chapter_id"
    t.index ["chapter_id"], name: "index_mux_datas_on_chapter_id"
  end

  create_table "purchases", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "user_id"
    t.uuid "course_id"
    t.datetime "created_at", default: -> { "CURRENT_TIMESTAMP" }
    t.datetime "updated_at"
    t.index ["course_id"], name: "index_purchases_on_course_id"
    t.index ["user_id", "course_id"], name: "index_purchases_on_user_id_and_course_id", unique: true
  end

  create_table "stripe_customers", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "user_id"
    t.string "stripe_customer_id"
    t.datetime "created_at", default: -> { "CURRENT_TIMESTAMP" }
    t.datetime "updated_at"
  end

  create_table "user_progresses", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "user_id"
    t.uuid "chapter_id"
    t.boolean "is_completed", default: false
    t.datetime "created_at", default: -> { "CURRENT_TIMESTAMP" }
    t.datetime "updated_at"
    t.index ["chapter_id"], name: "index_user_progresses_on_chapter_id"
    t.index ["user_id", "chapter_id"], name: "index_user_progresses_on_user_id_and_chapter_id", unique: true
  end

end
