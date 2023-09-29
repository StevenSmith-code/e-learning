# app/controllers/chapters_controller.rb
class ChaptersController < ApplicationController
    before_action :authenticate_user!

    before_action :set_course, only: [:destroy, :update,:create]
  before_action :set_chapter, only: [:destroy, :update]
  before_action :set_course_and_chapter, only: [:publish]
  
    def create
      begin
        unless @course.present? && @course.user_id == current_user.id
          render json: { error: 'Unauthorized' }, status: :unauthorized and return
        end
  
        last_chapter = @course.chapters.order(position: :desc).first
        new_position = last_chapter ? last_chapter.position + 1 : 1
  
        chapter_params = params.require(:chapter).permit(:title)
        chapter = @course.chapters.create!(chapter_params.merge(position: new_position))
  
        render json: chapter, status: :created
      rescue => e
        Rails.logger.error "[CHAPTERS] #{e.message}"
        render json: { error: 'Internal Error' }, status: :internal_server_error
      end
    end

    def destroy
        begin
          if @chapter.video_url
            existing_mux_data = @chapter.mux_data.first
            if existing_mux_data
              Mux::Video::Assets.delete(existing_mux_data.asset_id)
              existing_mux_data.destroy
            end
          end
          @chapter.destroy
    
          published_chapters = @course.chapters.where(is_published: true)
          unless published_chapters.exists?
            @course.update(is_published: false)
          end
    
          render json: @chapter
        rescue => e
          Rails.logger.error "[CHAPTER_ID_DELETE] #{e.message}"
          render json: { error: 'Internal Error' }, status: :internal_server_error
        end
      end
    
      def update
        begin
          chapter_params = params.require(:chapter).permit(:is_published, :video_url, :other_attributes)
          @chapter.update(chapter_params)
    
          if chapter_params[:video_url]
            existing_mux_data = @chapter.mux_data.first
            if existing_mux_data
              Mux::Video::Assets.delete(existing_mux_data.asset_id)
              existing_mux_data.destroy
            end
    
            asset = Mux::Video::Assets.create(input: chapter_params[:video_url], playback_policy: 'public')
            @chapter.mux_data.create(asset_id: asset.id, playback_id: asset.playback_ids.first.id)
          end
    
          render json: @chapter
        rescue => e
          Rails.logger.error "[COURSES_CHAPTER_ID] #{e.message}"
          render json: { error: 'Internal Error' }, status: :internal_server_error
        end
      end

      def publish
        begin
          mux_data = @chapter.mux_data.first
    
          unless mux_data && @chapter.title && @chapter.description && @chapter.video_url
            render json: { error: 'Missing required fields' }, status: :bad_request
            return
          end
    
          @chapter.update(is_published: true)
          render json: @chapter
        rescue => e
          Rails.logger.error "[CHAPTER_PUBLISH] #{e.message}"
          render json: { error: 'Internal Error' }, status: :internal_server_error
        end
      end

      def unpublish
        begin
          @chapter.update(is_published: false)
    
          published_chapters_in_course = @course.chapters.where(is_published: true)
    
          if published_chapters_in_course.empty?
            @course.update(is_published: false)
          end
    
          render json: @chapter
        rescue => e
          Rails.logger.error "[CHAPTER_UNPUBLISH] #{e.message}"
          render json: { error: 'Internal Error' }, status: :internal_server_error
        end
      end

      def progress
        begin
          is_completed = params[:isCompleted]
          
          user_progress = UserProgress.find_or_initialize_by(
            user_id: current_user.id,
            chapter_id: params[:id]
          )
          user_progress.is_completed = is_completed
          user_progress.save!
    
          render json: user_progress
        rescue => e
          Rails.logger.error "[CHAPTER_ID_PROGRESS] #{e.message}"
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
  
    def set_course
      @course = Course.find_by(id: params[:course_id])
    end
    def set_course_and_chapter
        @course = Course.find_by(id: params[:course_id], user_id: current_user.id)
        render json: { error: 'Unauthorized' }, status: :unauthorized unless @course
    
        @chapter = @course.chapters.find_by(id: params[:id])
        render json: { error: 'Unauthorized' }, status: :unauthorized unless @chapter
      end
  end
  