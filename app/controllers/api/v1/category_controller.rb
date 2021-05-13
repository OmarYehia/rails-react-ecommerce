class Api::V1::CategoryController < ApplicationController
  # Skipping token for testing purpose
  skip_before_action :verify_authenticity_token

  
  def index
    categories = Category.all
    byebug
    render json: categories
  end

  def create
    category = Category.new(category_params)
    if category.save()
      byebug
      render json: {
        success: true,
        category: category
      }, status: 201
    else
      render json: {
        success: false,
        errors: category.errors
      }, status: 400
    end
  end

  def show
    category = Category.find(params[:id])
    render json: {
      name: category.name,
      imageUrl: category.get_image_url()
    }
  end

  def destroy
  end

  private
  def category_params
    params.permit(:name, :image)
  end
end
