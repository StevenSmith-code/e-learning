Rails.application.routes.draw do
  namespace :api do
    resources :users do
      get 'courses', to: "courses#user_courses"
    end
  resources :courses
  resources :tags
  resources :enrollments
  post "/login", to:"sessions#create"
  post "/create-checkout-session", to: "payments#create_checkout_session"
  get "/user", to: "users#show"
  delete "/logout", to: "sessions#destroy"
  end
    # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
 
end