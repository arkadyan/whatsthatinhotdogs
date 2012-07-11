require 'compass' #must be loaded before sinatra
require 'sinatra'


get '/' do
  erb :index
end

get '/prices' do
  send_file 'public/data/2011/prices_2011.json'
end

get '/players' do
  send_file 'public/data/2011/players_2011.json'
end

get '/stylesheets/:name.css' do
  content_type 'text/css', :charset => 'utf-8'
  scss :"stylesheets/#{params[:name]}", Compass.sass_engine_options
end
