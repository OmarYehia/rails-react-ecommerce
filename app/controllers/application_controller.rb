class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session
  # before_action :authorized

  def encode_token(payload)
    JWT.encode(payload, 'secret')
  end

  def auth_header
    request.headers['Authorization']
  end

  def decoded_token
    if auth_header
      token = auth_header.split(' ')[1]
      begin
        JWT.decode(token, 'secret', true, algorithm: 'HS256')
      rescue JWT::DecodeError
        nil
      end
    end
  end

  def logged_in_user
    if decoded_token
      user_id = decoded_token[0]['user_id']
      @user = User.find_by(id: user_id)
    end
  end

  def logged_in?
    !!logged_in_user
  end

  def authorized
    render json: { message: 'Please log in' }, status: :unauthorized unless logged_in?
  end

  def logged_in_admin
    if decoded_token
      user_id = decoded_token[0]['user_id']
      @user = User.find_by(id: user_id)
      if @user.is_admin
        return @user
      else
        return false
      end
    end
  end

  def logged_in_as_admin?
    !!logged_in_admin
  end

  def is_admin
    render json: { message: 'Unauthorized Access' },status: 4001, status: :unauthorized unless logged_in_as_admin?
  end
end