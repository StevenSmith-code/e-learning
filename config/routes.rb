Rails.application.routes.draw do
  namespace :api do
    resources :users
  resources :courses
  resources :tags
  resources :enrollments
  post "/login", to:"sessions#create"
  post "/create-checkout-session", to: "payments#create_checkout_session"
  end
    # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
 
end