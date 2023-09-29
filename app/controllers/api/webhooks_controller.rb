# app/controllers/webhooks_controller.rb
  class WebhooksController < ApplicationController
    skip_before_action :verify_authenticity_token, only: [:stripe]  # Skip CSRF protection for this action
    
    def stripe
      payload = request.body.read
      sig_header = request.headers['Stripe-Signature']
      
      event = nil
  
      begin
        event = Stripe::Webhook.construct_event(
          payload, sig_header, Rails.application.credentials.stripe[:webhook_secret]
        )
      rescue JSON::ParserError => e
        render json: { error: "Invalid payload" }, status: 400
        return
      rescue Stripe::SignatureVerificationError => e
        render json: { error: "Invalid signature" }, status: 400
        return
      end
  
      # Handle the event
      case event['type']
      when 'checkout.session.completed'
        session = event['data']['object']  # checkout session object
        user_id = session['metadata']['user_id']
        course_id = session['metadata']['course_id']
  
        if user_id.blank? || course_id.blank?
          render json: { error: "Webhook Error: Missing metadata" }, status: 400
          return
        end
  
        Purchase.create!(course_id: course_id, user_id: user_id)
      else
        # Unhandled event type
        render json: { error: "Unhandled event type #{event['type']}" }, status: 200
        return
      end
  
      render json: { success: true }, status: 200  # Successfully processed
    end
  end
  