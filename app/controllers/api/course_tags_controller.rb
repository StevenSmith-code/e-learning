module Api
  class CourseTagsController < ApplicationController
    def create
      @course_tag = CourseTag.new(course_tag_params)
      if @course_tag.save
        render json: @course_tag, status: :created
      else
        render json: @course_tag.errors, status: :unprocessable_entity
      end
    end
  
    def destroy
      @course_tag = CourseTag.find(params[:id])
      @course_tag.destroy
      render json: { message: 'Tag was successfully removed from course.' }
    end
  
    private
  
    def course_tag_params
      params.require(:course_tag).permit(:course_id, :tag_id)
    end
  end
  
end