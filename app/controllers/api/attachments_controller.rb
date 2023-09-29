class AttachmentsController < ApplicationController
    before_action :authenticate_user!
    before_action :set_course
  
    def create
      begin
        unless @course.present? && @course.user == current_user
          render json: { error: 'Unauthorized' }, status: :unauthorized and return
        end
  
        url = params[:url]
        attachment = @course.attachments.create!(url: url, name: File.basename(url))
  
        render json: attachment
      rescue => e
        Rails.logger.error "[COURSE_ID_ATTACHMENTS] #{e.message}"
        render json: { error: 'Internal Error' }, status: :internal_server_error
      end
    end

    def destroy
        begin
          unless @course.present? && @course.user_id == current_user.id
            render json: { error: 'Unauthorized' }, status: :unauthorized and return
          end
    
          @attachment.destroy!
    
          render json: @attachment, status: :ok
        rescue => e
          Rails.logger.error "[ATTACHMENT_ID] #{e.message}"
          render json: { error: 'Internal Error' }, status: :internal_server_error
        end
      end
  
    private
  
    def authenticate_user!
        render json: { error: 'Unauthorized' }, status: :unauthorized unless clerk_user
      end
    
      def authorize_teacher!
        render json: { error: 'Unauthorized' }, status: :unauthorized unless is_teacher?(clerk_user)
      end
  
    def set_course_and_attachment
        @course = Course.find_by(id: params[:course_id])
        @attachment = @course.attachments.find_by(id: params[:id]) if @course.present?
      end
  end
  