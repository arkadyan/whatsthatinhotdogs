require 'compass' #must be loaded before sinatra
require 'sinatra'
require 'coffee-script'


# Added headers for Varnish [cache the hell out of it, yo]
before do
  response.headers['Cache-Control'] = 'public, max-age=36000'
end

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
