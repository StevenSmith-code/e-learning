class CreateStripeCustomers < ActiveRecord::Migration[7.0]
  def change
    create_table :stripe_customers, id: :uuid do |t|
      t.string "user_id", unique: true
      t.string "stripe_customer_id", unique: true
      t.datetime "created_at", default: -> { "CURRENT_TIMESTAMP" }
      t.datetime "updated_at"
    end
  end
end
