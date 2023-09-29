# config/routes.rb
Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    post 'webhook', to: 'webhooks#create'
    
    resources :courses, only: [:index, :show, :create, :update, :destroy] do
      member do
        post 'checkout'
        post 'publish'
        post 'unpublish'
        resources :attachments, only: [:index, :create, :show, :update, :destroy]
        resources :chapters, only: [:index, :create, :show, :update, :destroy] do
          member do
            post 'publish'
            post 'unpublish'
            post 'progress'
            put 'reorder', on: :collection
          end
        end
      end
    end
  end
end
