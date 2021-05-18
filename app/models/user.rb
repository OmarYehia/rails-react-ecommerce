class User < ApplicationRecord
    has_secure_password
    validates :username, presence: true 
    validates :email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP, message: "Must be a vaild email" }
    validates :password_confirmation, presence: true
end
