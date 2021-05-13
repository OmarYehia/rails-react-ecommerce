class Api::V1::CategoryController < ApplicationController
  # Skipping token for testing purpose
  skip_before_action :verify_authenticity_token

  
  def index
    categories = Category.all
   
    render json: {
      success: true,
      totalRecords: categories.length,
      data: (ActiveModel::ArraySerializer.new(categories, each_serializer: CategorySerializer))
    }, status: 200
  end

  def create
    category = Category.new(category_params)
    if category.save()
      render json: {
        success: true,
        data: CategorySerializer.new(category)
      }, status: 201
    else
      render json: {
        success: false,
        errors: category.errors
      }, status: 400
    end
  end

  def show
    begin
      category = Category.find(params[:id])
      render json: {
        success: true,
        data: CategorySerializer.new(category)
      } , status: 200
    rescue ActiveRecord::RecordNotFound => e
      render json: {
        success: false,
        errors: { category: "Not found." } 
      }, status: 404
    end
  end

  def destroy
    begin
      category = Category.find(params[:id])
      category.delete()
      render json: {
        success: true,
      }, status: 202
    rescue ActiveRecord::RecordNotFound => e
      render json: {
        success: false,
        errors: { category: "Not found." } 
      }, status: 404
    end
  end

  private
  def category_params
    params.permit(:name, :image)
  end
end
