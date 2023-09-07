class CoursesController < ApplicationController
    before_action :set_course, only: [:show, :edit, :update, :destroy]

    def index
        @courses = Course.all
        render json: @courses
      end
    
      def show
        render json: @course
      end
    
      def create
        @course = Course.new(course_params)
        if @course.save
          render json: @course, status: :created
        else
          render json: @course.errors, status: :unprocessable_entity
        end
      end
    
      def update
        if @course.update(course_params)
          render json: @course
        else
          render json: @course.errors, status: :unprocessable_entity
        end
      end
    
      def destroy
        @course.destroy
        render json: { message: 'Course was successfully destroyed.' }
      end
  
    private
  
    def set_course
      @course = Course.find(params[:id])
    end
  
    def course_params
      params.require(:course).permit(:title, :content_link, :price, :description, :author_id, :image_url, :duration ) # and other fields
    end
end