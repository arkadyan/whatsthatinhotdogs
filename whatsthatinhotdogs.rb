require 'rubygems'
require 'compass' #must be loaded before sinatra
require 'sinatra'
require 'bundler/setup'
Bundler.require

get '/' do
  erb :index
end

get '/teams' do
  send_file 'public/data/2012/teams.json'
end

get '/players' do
  send_file 'public/data/2012/players.json'
end

get '/stylesheets/:name.css' do
  content_type 'text/css', :charset => 'utf-8'
  scss :"stylesheets/#{params[:name]}", Compass.sass_engine_options
end
