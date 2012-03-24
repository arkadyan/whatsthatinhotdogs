import os
from flask import Flask, jsonify
app = Flask(__name__)

from utils import jsonp

@app.route('/')
def hello():
    return 'Hello World!'

@app.route('/team/<team>', defaults={'year': 2011})
@app.route('/team/<team>/<year>', methods=['GET'])
@jsonp
def team(team, year):
    from utils import get_team
    #call api
    data = get_team(team, year=year)
    return jsonify(team=team,
                   data=data)
    
@app.route('/player/<name>', defaults={'year': 2011})
@app.route('/player/<name>/<year>', methods=['GET'])
@jsonp
def player(name, year):
    from utils import get_player
    #call api
    data = get_player(name, year=year)
    return jsonify(player=name,
                   salary=data['data'],
                   hotdog=data['hotdog'],
                   raw=data)

if __name__ == '__main__':
    # Bind to PORT if defined, otherwise default to 5000.
    port = int(os.environ.get('PORT', 5000))
    #app.debug = True
    app.run(host='0.0.0.0', port=port)
