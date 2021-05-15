class Api::V1::CategoryController < ApplicationController
  # Skipping token for testing purpose
  # skip_before_action :verify_authenticity_token
  # before_action :authorized

  
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
    rescue Exception => e
      render json: {
        success: false,
        errors: e.message
      }, status: 500
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
        errors: e.message 
      }, status: 404
    rescue Exception => e
      render json: {
        success: false,
        errors: e.message
      }, status: 500
    end
  end

  def update
    begin
      category = Category.find(params[:id])
      if category.update(category_params)
        render json: {
          success: true,
          data: CategorySerializer.new(category)
        }, status: 202
      else
        render json: {
          success: false,
          errors: category.errors
        }, status: 400
      end
    rescue ActiveRecord::RecordNotFound => e
      render json: {
        success: false,
        errors: e.message 
      }, status: 404
    rescue Exception => e
      render json: {
        success: false,
        errors: e.message
      }, status: 500
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
        errors: e.message 
      }, status: 404
    rescue Exception => e
      render json: {
        success: false,
        errors: e.message
      }, status: 500
    end
  end

  private
  def category_params
    params.permit(:name, :image)
  end
end
