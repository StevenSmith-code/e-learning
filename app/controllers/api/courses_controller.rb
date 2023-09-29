module Api
  class CoursesController < ApplicationController
    before_action :set_course, only: [:show, :edit, :update, :destroy]
    before_action :authenticate_user!
  before_action :authorize_teacher!

    def index
      @courses = Course.all
      render json: @courses, each_serializer: CourseSerializer
    end
    
    
      def show
        render json: @course
      end
    
      def create
        course = Course.new(course_params.merge(user_id: clerk_user.id))
        if course.save
          render json: course, status: :created
        else
          render json: course.errors, status: :unprocessable_entity
        end
      rescue => e
        Rails.logger.error "[COURSES] #{e.message}"
        render json: { error: 'Internal Error' }, status: :internal_server_error
      end
    
      def update
        if @course.update(course_params)
          render json: @course, status: :ok
        else
          render json: @course.errors, status: :unprocessable_entity
        end
      rescue => e
        Rails.logger.error "[COURSE_ID] #{e.message}"
        render json: { error: 'Internal Error' }, status: :internal_server_error
      end
    
    
      def destroy
        @course.chapters.each do |chapter|
          if chapter.mux_data&.asset_id
            Mux::Video::Assets.delete(chapter.mux_data.asset_id)
          end
        end
        @course.destroy
    render json: @course, status: :ok
  rescue => e
    Rails.logger.error "[COURSE_ID_DELETE] #{e.message}"
    render json: { error: 'Internal Error' }, status: :internal_server_error
  end

  def checkout
    begin
      user = current_user

      if user.blank?
        render json: { error: 'Unauthorized' }, status: :unauthorized and return
      end

      purchase = Purchase.find_by(user_id: user.id, course_id: @course.id)

      if purchase.present?
        render json: { error: 'Already purchased' }, status: :bad_request and return
      end

      stripe_customer = StripeCustomer.find_by(user_id: user.id)

      if stripe_customer.blank?
        customer = Stripe::Customer.create(email: user.email)
        stripe_customer = StripeCustomer.create(user_id: user.id, stripe_customer_id: customer.id)
      end

      line_items = [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: @course.title,
            description: @course.description
          },
          unit_amount: (@course.price * 100).to_i
        },
        quantity: 1
      }]

      session = Stripe::Checkout::Session.create(
        customer: stripe_customer.stripe_customer_id,
        payment_method_types: ['card'],
        line_items: line_items,
        mode: 'payment',
        success_url: "#{Rails.configuration.app_url}/courses/#{params[:course_id]}?success=1",
        cancel_url: "#{Rails.configuration.app_url}/courses/#{params[:course_id]}?canceled=1",
        metadata: {
          course_id: @course.id,
          user_id: user.id
        }
      )

      render json: { url: session.url }
    rescue => e
      Rails.logger.error "[COURSE_ID_CHECKOUT] #{e.message}"
      render json: { error: 'Internal Error' }, status: :internal_server_error
    end
  end

  def publish
    begin
      if @course.blank?
        render json: { error: 'Not found' }, status: :not_found and return
      end

      has_published_chapter = @course.chapters.any?(&:is_published)

      unless @course.title && @course.description && @course.image_url && @course.category_id && has_published_chapter
        render json: { error: 'Missing required fields' }, status: :unprocessable_entity and return
      end

      @course.update!(is_published: true)

      render json: @course
    rescue => e
      Rails.logger.error "[COURSE_ID_PUBLISH] #{e.message}"
      render json: { error: 'Internal Error' }, status: :internal_server_error
    end
  end

  
  def unpublish
    begin
      if @course.blank?
        render json: { error: 'Not found' }, status: :not_found and return
      end

      @course.update!(is_published: false)

      render json: @course
    rescue => e
      Rails.logger.error "[COURSE_ID_UNPUBLISH] #{e.message}"
      render json: { error: 'Internal Error' }, status: :internal_server_error
    end
  end


    private
  
    def set_course
      @course = Course.find_by(id: params[:id], user_id: clerk_user.id)
      render json: { error: 'Not found' }, status: :not_found unless @course
    end
  
  
    def course_params
      params.require(:course).permit(:title, :content_link, :price, :description, :author_id, :image_url, :duration, :instructor_id)
    end
    def authenticate_user!
      render json: { error: 'Unauthorized' }, status: :unauthorized unless clerk_user
    end
  
    def authorize_teacher!
      render json: { error: 'Unauthorized' }, status: :unauthorized unless is_teacher?(clerk_user)
    end
  
    def course_params
      params.require(:course).permit(:title)
    end
  
    def is_teacher?(user)
      user.id.to_s == ENV['RAILS_TEACHER_ID']
    end
end
end
