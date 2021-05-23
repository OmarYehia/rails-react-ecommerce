Rails.application.routes.draw do
    
  namespace :api do
    namespace :v1 do
      get 'stores/', to: "store#index"
      post 'stores/', to: "store#create"
      get 'stores/:id', to: "store#show"
      delete 'stores/:id', to: "store#destroy"
      put 'stores/:id', to: "store#update"
    end
  end
  namespace :api do
    namespace :v1 do
        resource :users, only: [:create]
        post "users/sellers", to: "users#add_seller"
        get "users", to: "users#index"
        get "auto_login", to: "users#auto_login"
        post "login", to: "users#login"
        get "users/:id", to: "users#show"
        put "users/edit/:id", to: "users#update"
    end
  end


  namespace :api do
    namespace :v1 do
      get '/categories/:category_id/brands/', to: 'brand#index'
      post '/categories/:category_id/brands/', to: 'brand#create'
      get '/brands/:id', to: 'brand#show'
      put 'brands/:id', to: 'brand#update'
      delete 'brands/:id', to: 'brand#destroy'
    end
  end
  namespace :api do
    namespace :v1 do
      get 'categories/', to: 'category#index'
      post 'categories/', to: 'category#create'
      get 'categories/:id', to: 'category#show'
      put 'categories/:id', to: 'category#update'
      delete 'categories/:id', to: 'category#destroy'
    end
  end
  root 'landing_page#index'
  get '*path' => 'landing_page#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
