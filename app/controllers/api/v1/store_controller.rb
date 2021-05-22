class Api::V1::StoreController < ApplicationController
  # Skipping token for testing purpose
  skip_before_action :verify_authenticity_token
  # before_action :authorized, only: [:create, :update, :delete]

  def index
    stores = Store.all
    render json: {
      success: true,
      totalRecords: stores.length,
      data: (ActiveModel::ArraySerializer.new(stores, each_serializer: StoreSerializer))
    }, status: 200
  end

  def create
    begin
      store = Store.new(store_params)
      seller = User.find(params[:sellerId])
      store.user_id = params[:sellerId]
      if store.save()
        render json: {
          success: true,
          data: StoreSerializer.new(store)
        }, status: 201
      else
        render json: {
          success: false,
          errors: store.errors
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
  end

  def destroy
  end

  private
  def store_params
    params.permit(:name, :summary)
  end
end
