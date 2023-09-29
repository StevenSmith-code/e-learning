module Api

    require "clerk/authenticatable"

class ApplicationController < ActionController::API
    include Clerk::Authenticatable
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

    before_action :authorize

    private

    def authorize
        render json: { errors: ["Not authorized"] }, status: :unauthorized unless clerk_session
      end

    def render_unprocessable_entity_response(exception)
        render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
    end

end
end