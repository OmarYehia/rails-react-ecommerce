require 'bcrypt'
class Api::V1::UsersController < ApplicationController
    include BCrypt
    before_action :authorized, only: [:auto_login]
    before_action :is_admin, only: [:index, :add_seller]

  # REGISTER
  def create
    # Tests if the username or the email already exist
    @test1 = User.find_by(username: params[:username])
    @test2 = User.find_by(email: params[:email])
    
    if !@test1 && !@test2 
      # Tests the password's length
      @test3 = params[:password] ? params[:password].length>6 : ""

      # User passes implemented validations
      @user = User.new(user_params)
      if @user.valid? && user_params["password"] == user_params["password_confirmation"] && @test3
        @user.save
        token = encode_token({user_id: @user.id})
        render json: {
          success:true, 
          data: UserSerializer.new(@user), 
          token: token}, 
          status:201
      else
        !@test3 ? @user.errors.messages["Password length"] = "Password length must be greater than 6 characters": nil
        render json: {
          success: false, 
          error: @user.errors,
          status:"400"
        }, status: 400
      end
    else
      # Database errors occur
      @msg= {}
      if @test1
        @msg["username"] = "Username already exists"
      end
      if @test2
        @msg["email"] = "Email already exists"
      end
      render json: {
        success: false, 
        error: @msg,
        status:"400"
      }, status: 400
    end
      
    # rescue Exception => e
    #   render json: {
    #     success: false,
    #     error: e.message,
    #     status:"500"
    #     }, status: 500
    # render json: {params: params}
  end

  # LOGGING IN
  def login
    @user = User.find_by(email: params[:email])
    if @user && BCrypt::Password.new(@user.password_digest) == params[:password]
      token = encode_token({user_id: @user.id})
      session[:user_id] = @user.id
      render json: {
        success: true, 
        data: UserSerializer.new(@user), 
        token: token}, 
        status: 200
    else
      render json: {
        success: false,
        error: "Invalid Username or Password"
      },
        status: 400
    end
  end


  def auto_login
    render json: @user
  end
  
  def index
    users = User.where("role = 'seller'")
    render json: {
      success: true,
      data: (ActiveModel::ArraySerializer.new(users, each_serializer: UserSerializer))
    },
    status: 200
  end

  def add_seller
    # Tests if the username or the email already exist
    @test1 = User.find_by(username: params[:username])
    @test2 = User.find_by(email: params[:email])
    
    if !@test1 && !@test2 
      # Tests the password's length
      @test3 = params[:password] ? params[:password].length>6 : ""

      # User passes implemented validations
      @user = User.new(user_params)
      @user.role="seller"
      if @user.valid? && user_params["password"] == user_params["password_confirmation"] && @test3
        @user.save
        token = encode_token({user_id: @user.id})
        render json: {
          success:true, 
          data: UserSerializer.new(@user), 
          token: token}, 
          status:201
      else
        !@test3 ? @user.errors.messages["Password length"] = "Password length must be greater than 6 characters": nil
        render json: {
          success: false, 
          error: @user.errors,
          status:"400"
        }, status: 400
      end
    else
      # Database errors occur
      @msg= {}
      if @test1
        @msg["username"] = "Username already exists"
      end
      if @test2
        @msg["email"] = "Email already exists"
      end
      render json: {
        success: false, 
        error: @msg,
        status:"400"
      }, status: 400
    end
  end

  def show
    @user = User.find_by(id:params[:id])
    if @user.present?
      render json: {
        success: true,
        data: UserSerializer.new(@user),
      },
      status: 200
    else
      render json: {
        success: false,
        error: "User not found"
      },
      status: 404
    end
  end 

  def update
    @user=User.find_by(id:params[:id])
    if @user.present?
      if @user.update(:skip_password_confirmation=> true, username: params[:username], email:params[:email])
        render json: {
          success: true,
          data: UserSerializer.new(@user)
        },
        status: 200
      else
        render json: {
          success: false,
          error: "Couldnt update user"
        },
        status: 400
      end
    else
      render json: {
        success: false,
        error: "User not found"
      },
      status: 400
    end
  end

  def destroy
    @user = User.find_by(id:params[:id])
    if @user.present?
      @user.delete()
      render json: {
        success: true,
      }, status: 202
    else
      render json: {
        success: false,
        error: "User not found"
      }, status: 400
    end
  end



  private

  def user_params
    params.permit(:username, :password, :password_confirmation, :email)
  end
end