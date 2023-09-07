Rails.application.routes.draw do
  resources :users
  resources :courses
  resources :tags
  resources :enrollments

  post "/create-checkout-session", to: "payments#create_checkout_session"
    # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end