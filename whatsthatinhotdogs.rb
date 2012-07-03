require 'rubygems'
require 'compass' #must be loaded before sinatra
require 'sinatra'
require 'bundler/setup'
Bundler.require


get '/' do
  erb :index
end

get '/stylesheets/:name.css' do
  content_type 'text/css', :charset => 'utf-8'
  scss :"stylesheets/#{params[:name]}", Compass.sass_engine_options
end





# import os
# from flask import Flask, jsonify, render_template
# from utils import jsonp, hotdog_data_for_year, beer_data_for_year
# app = Flask(__name__)
# 
# @app.route('/')
# def index():
#   return render_template('index.html')
#   
# @app.route('/players', defaults={'year': 2011})
# @app.route('/players/<year>', methods=['GET'])
# @jsonp
# def players(year):
#   # TODO: Make /players actually listen to the year and serve up generated content
#   return render_template('players_2011.json')
# 
# @app.route('/prices', defaults={'year': 2011, 'currency': 'hotdogs'})
# @app.route('/prices/<currency>/<year>', methods=['GET'])
# @jsonp
# def prices(currency, year):
#   if currency == 'beer':
#     return jsonify(beer_data_for_year(str(year)))
#   else:
#     return jsonify(hotdog_data_for_year(str(year)))
#     
# @app.route('/team/<team>', defaults={'year': 2011})
# @app.route('/team/<team>/<year>', methods=['GET'])
# @jsonp
# def team(team, year):
#     from utils import get_team
#     #call api
#     data = get_team(team, year=year)
#     return jsonify(team=team,
#                    data=data)
# 
# @app.route('/player/<name>', defaults={'year': 2011})
# @app.route('/player/<name>/<year>', methods=['GET'])
# @jsonp
# def player(name, year):
#     from utils import get_player
#     #call api
#     data = get_player(name, year=year)
#     return jsonify(player=name,
#                    salary=data['data'],
#                    hotdog=data['hotdog'],
#                    raw=data)
# 
# if __name__ == '__main__':
#     # Bind to PORT if defined, otherwise default to 5000.
#     port = int(os.environ.get('PORT', 5000))
#     # app.debug = True
#     app.run(host='0.0.0.0', port=port)
