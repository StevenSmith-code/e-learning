# This file is used by Rack-based servers to start the application.

require_relative "config/environment"
require 'rack/cors'

use Rack::Cors do
  allow do
    origins 'http://127.0.0.1:5173'
    resource '*', headers: :any, methods: [:get, :post, :delete, :put, :options]
  end
end

run Rails.application
Rails.application.load_server
