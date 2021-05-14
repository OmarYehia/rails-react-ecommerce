Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'brands/', to: 'brand#index'
      post 'brands/', to: 'brand#create'
      get 'brands/:id', to: 'brand#show'
      delete 'brands/:id', to: 'brand#destroy'
    end
  end
  namespace :api do
    namespace :v1 do
      get 'categories/', to: 'category#index'
      post 'categories/', to: 'category#create'
      get 'categories/:id', to: 'category#show'
      delete 'categories/:id', to: 'category#destroy'
    end
  end
  root 'landing_page#index'
  get '*path' => 'landing_page#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
