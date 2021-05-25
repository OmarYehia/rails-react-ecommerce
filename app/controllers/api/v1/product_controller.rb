class Api::V1::ProductController < ApplicationController
  # Skipping token for testing purpose
  skip_before_action :verify_authenticity_token
  # before_action :authorized, only: [:create, :update, :delete]
  
  def index
    begin
  
      products = Product.all
      render json: {
        success: true,
        totalRecords: products.length,
        data: (ActiveModel::ArraySerializer.new(products, each_serializer: ProductSerializer))
      }, status: 200
    rescue ActiveRecord::RecordNotFound => e
      render json: {
        success: false,
        errors: e.message
      }, status: 404
    rescue  Exception => e
      render json: {
        success: false,
        errors: e.message
      }, status: 500
    end
  end

  def create
    begin
      brand = Brand.find(params[:id])
      store = Store.find(params[:storeId])
      product = brand.products.new(product_params)
      product.store = store
      if product.save()
        render json: {
          success: true,
          data: ProductSerializer.new(product)
        }, status: 201
      else
        render json: {
          success: false,
          errors: product.errors
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
      product = Product.find(params[:id])
      render json: {
        success: true,
        data: ProductSerializer.new(product)
      }, status: 200
    rescue ActiveRecord::RecordNotFound => e 
      render json: {
        success: false,
        errors: e.message
      } , status: 404
    rescue Exception => e 
      render json: {
        success: false, 
        errors: e.message
      }, status: 500
    end
  end

  def destroy
    begin
      product = Product.find(params[:id])
      product.delete()
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

  def update
    begin
      product = Product.find(params[:id])
      if product.update(product_params)
        render json: {
          success: true,
          data: ProductSerializer.new(product)
        }, status: 202
      else
        render json: {
          success: false,
          errors: product.errors
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


  private
  def product_params
    params.permit(:title, :description, :price, :quantity, :image)
  end
end
