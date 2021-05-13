class Api::V1::BrandController < ApplicationController
  # Skipping token for testing purpose
  skip_before_action :verify_authenticity_token

  def index
    brands = Brand.all
    render json: {
      success: true,
      totalRecords: brands.length,
      data: (ActiveModel::ArraySerializer.new(brands, each_serializer: BrandSerializer))
    }, status: 200
  end

  def create
    begin
      category = Category.find(params[:category_id])
      brand = category.brands.new(brand_params)
      if brand.save()
        render json: {
          success: true,
          data: BrandSerializer.new(brand)
        }, status: 201
      else
        render json: {
          success: false,
          errors: brand.errors
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

  def show
    begin
      brand = Brand.find(params[:id])
      render json: {
        success: true,
        data: BrandSerializer.new(brand)
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

  def destroy
    begin
      brand = Brand.find(params[:id])
      brand.delete()
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
  def brand_params
    params.permit(:name, :image)
  end
end
