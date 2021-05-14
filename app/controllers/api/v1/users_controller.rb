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
      render json: {success:true, data: UserSerializer.new(@user), token: token}, status:201
    else
      render json: {success: false, error: "Invalid username or password"}, status: 400
    end
  end

  # LOGGING IN
  def login
    @user = User.find_by(email: params[:email])
    @pass = BCrypt::Password.new(@user.password_digest)
    if @user && @user.password_digest == @pass
      token = encode_token({user_id: @user.id})
      render json: {success: true, data: UserSerializer.new(@user), token: token}, status: 201
    else
      render json: {success: false, error: "Invalid username or password"}, status: 400
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
