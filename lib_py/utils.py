
"""
Taken from:  https://gist.github.com/1094140
"""

from functools import wraps
from flask import request, current_app
from hotdog import hotdog_data
from beer import beer_data
import json


def jsonp(func):
    """Wraps JSONified output for JSONP requests."""
    @wraps(func)
    def decorated_function(*args, **kwargs):
        callback = request.args.get('callback', False)
        if callback:
            data = str(func(*args, **kwargs).data)
            content = str(callback) + '(' + data + ')'
            mimetype = 'application/javascript'
            return current_app.response_class(content, mimetype=mimetype)
        else:
            return func(*args, **kwargs)
    return decorated_function
    
def hotdog_data_for_year(year):
  """Return a dictionary of the team hotdog prices for a given year."""
  prices = {}
  for key, value in hotdog_data.iteritems():
    prices[key] = value[year]
  return prices

def beer_data_for_year(year):
  """Return a dictionary of the team beer prices for a given year."""
  prices = {}
  for key, value in beer_data.iteritems():
    prices[key] = value[year]
  return prices

def process_players(data, hotdog_price):
    """
    We want the team salary information to be a dictionary keyed by player
    so that you can say salary['JD-Drew'] and get his salar for the requested year.
    """
    players = {}
    for salary in data['salaries'][0]['salary']:
        salary['hotdog_salary'] = get_hotdog_salary(salary['salary'], hotdog_price)
        players[salary['player']] = salary
    return players

def get_team(team, year=2011):
    import urllib
    import json
    api_key = 'pqvy9pxvzn795fr2j9c2zatk'
    api_base='http://api.usatoday.com/salaries/mlb?encoding=json&teams=%s&seasons=%s&api_key=%s'
    api_call = api_base % (team, year, api_key)
    handle = urllib.urlopen(api_call)
    hotdog_price = hotdog_data[team][str(year)]
    data = json.load(handle)
    players = process_players(data, hotdog_price)
    total = data['salaries'][0]
    del total['salary']
    
    
    
    return {'meta': data['rootmetadata'],
            'total': data['salaries'], 
            'players': players,
            
            'hotdog': hotdog_price,
            #'total': total
            }
    
#http://api.usatoday.com/open/salaries/mlb?encoding=json&players=derek-jeter&seasons=2011&api_key=zgjwf79eps2wrauw83792wbg
def get_player(name, year=2011):
    import urllib
    import json
    name = name.lower()
    api_key = 'zgjwf79eps2wrauw83792wbg'
    api_base='http://api.usatoday.com/open/salaries/mlb?encoding=json&players=%s&seasons=%s&api_key=%s'
    api_call = api_base % (name, year, api_key)
    handle = urllib.urlopen(api_call)
    data = json.load(handle)
    player = data['salaries'][0]['salary'][0]
    team_name = player['team_last_name'].lower()
    hotdog_price = hotdog_data[team_name][str(year)]
    #hotdog salary
    hds = get_hotdog_salary(player['salary'],
                            hotdog_price) 
    return {'meta': data['rootmetadata'],
            'data': player,
            'hotdog': hotdog_price,
            'hotdog_salary': hds,
            #'total': total
            }
    
def get_hotdog_salary(salary, hotdog):
    #Replace commas in salary and convert to int. 
    s = int(salary.replace(',', ''))
    if hotdog < 1:
		hotdog = 1
    return round(float(s / hotdog), -1)


if __name__ == "__main__":
    from pprint import pprint
    #pprint(get_players('redsox'))
    pprint(hotdog_data)
#    d = {}
#    for team in hotdog_data:
#        tid = team["TeamID"]
#        del team["TeamID"]
#        d[tid] = team
#
#    pprint(d)