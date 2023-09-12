# app/controllers/api/tags_controller.rb
module Api
class TagsController < ApplicationController
    before_action :set_tag, only: [:show, :update, :destroy]
    skip_before_action :authorize, only: :create
  
    # GET /api/tags
    def index
      @tags = Tag.all
      render json: @tags
    end
  
    # GET /api/tags/1
    def show
      render json: @tag
    end
  
    # POST /api/tags
    def create
      @tag = Tag.new(tag_params)
  
      if @tag.save
        render json: @tag, status: :created
      else
        render json: @tag.errors, status: :unprocessable_entity
      end
    end
  
    # PATCH/PUT /api/tags/1
    def update
      if @tag.update(tag_params)
        render json: @tag
      else
        render json: @tag.errors, status: :unprocessable_entity
      end
    end
  
    # DELETE /api/tags/1
    def destroy
      @tag.destroy
    end
  
    private
  
    def set_tag
      @tag = Tag.find(params[:id])
    end
  
    def tag_params
      params.require(:tag).permit(:name)
    end
  end
end