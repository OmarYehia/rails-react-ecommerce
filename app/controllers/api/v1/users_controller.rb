require 'bcrypt'
class Api::V1::UsersController < ApplicationController
    include BCrypt
    before_action :authorized, only: [:auto_login]

  # REGISTER
  def create
    @pass = BCrypt::Password.create(user_params["password_digest"])
    @user = User.new(username: user_params["username"], password_digest: @pass, email:user_params["email"] )
    if @user.valid?
      @user.save
      token = encode_token({user_id: @user.id})
      render json: {
        success:true, 
        data: UserSerializer.new(@user), 
        token: token}, 
        status:201
    else
      render json: {
        success: false, 
        error: "Invalid email or password"},
        status: 400
    end
    rescue Exception => e
      render json: {
        success: false,
        errors: e.message
      }, status: 500
  end

  # LOGGING IN
  def login
    @user = User.find_by(email: params[:email])
    if @user && BCrypt::Password.new(@user.password_digest) == params[:password_digest]
      token = encode_token({user_id: @user.id})
      render json: {
        success: true, 
        data: UserSerializer.new(@user), 
        token: token}, 
        status: 201
    else
      render json: {
        success: false,
        error: "Invalid email or password"},
        status: 400
    end
  end


  def auto_login
    render json: @user
  end

  private

  def user_params
    params.permit(:username, :password_digest, :email)
  end
end
