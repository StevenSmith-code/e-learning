class Api::PaymentsController < ApplicationController

    YOUR_DOMAIN = Rails.env.development? ? 'http://localhost:3001' : 'YOUR_PRODUCTION_DOMAIN'

    def create_checkout_session
        items = params[:items]
    
        transformed_items = items.map do |item|
          {
            description: item[:description],
            quantity: 1, # This assumes one item per line. Adjust if needed.
            price_data: {
              currency: "usd",
              unit_amount: (item[:price].to_f * 100).to_i, # Convert to cents
              product_data: {
                name: item[:title],
                images: [item[:image]] # Assuming `image` contains a single URL string.
              }
            }
          }
        end
    
        session = Stripe::Checkout::Session.create({
          line_items: transformed_items,
          mode: 'payment',
          success_url: YOUR_DOMAIN + '?success=true',
          cancel_url: YOUR_DOMAIN + '?canceled=true',
          automatic_tax: { enabled: true }
        })
    
        render json: { url: session.url }
      end
  
end