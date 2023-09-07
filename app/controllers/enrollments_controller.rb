# app/controllers/api/enrollments_controller.rb

class Api::EnrollmentsController < ApplicationController
    before_action :set_enrollment, only: [:show, :update, :destroy]

    def create
      @enrollment = Enrollment.new(enrollment_params)
  
      if @enrollment.save
        render json: @enrollment, status: :created
      else
        render json: @enrollment.errors, status: :unprocessable_entity
      end
    end
  
    def update
      if @enrollment.update(enrollment_params)
        render json: @enrollment
      else
        render json: @enrollment.errors, status: :unprocessable_entity
      end
    end
  
    def destroy
      @enrollment.destroy
      render json: { message: 'Enrollment was successfully canceled.' }
    end
  
    def mark_completed
      # Using session to get the currently logged in user's ID
      enrollment = Enrollment.find_by(user_id: session[:user_id], course_id: params[:course_id])
      
      if enrollment
          enrollment.update!(completion_percentage: 1.0, completed_at: Time.now)
          render json: { message: "Course marked as completed." }, status: :ok
      else
          render json: { error: "Enrollment not found." }, status: :not_found
      end
  end
  

    private
  
    def set_enrollment
      @enrollment = Enrollment.find(params[:id])
    end
  
    def enrollment_params
      params.require(:enrollment).permit(:user_id, :course_id, :completion_percentage, :completed_at, :status)
    end
  end
  