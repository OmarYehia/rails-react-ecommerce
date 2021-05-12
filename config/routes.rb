Rails.application.routes.draw do
  root 'landing_page#index'
  get 'landing_page/index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
