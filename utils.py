
"""
Taken from:  https://gist.github.com/1094140
"""

from functools import wraps
from flask import request, current_app
from hotdog import hotdog_data
import json

#hotdog_data = {
# 'angels': {'2009': 3, '2010': 3, '2011': 3, 'Team': 'Los Angeles Angels'},
# 'astros': {'2009': 4.75,
#            '2010': 4.75,
#            '2011': 4.75,
#            'Team': 'Houston Astros'},
# 'athletics': {'2009': 3.5,
#               '2010': 3.5,
#               '2011': 3.5,
#               'Team': 'Oakland Athletics'},
# 'bluejays': {'2009': 3.7999999999999998,
#              '2010': 5,
#              '2011': 5.1100000000000003,
#              'Team': 'Toronto Blue Jays'},
# 'braves': {'2009': 4.25, '2010': 4.25, '2011': 4.5, 'Team': 'Atlanta Braves'},
# 'brewers': {'2009': 2.75,
#             '2010': 3.25,
#             '2011': 3.25,
#             'Team': 'Milwaukee Brewers'},
# 'cardinals': {'2009': 4,
#               '2010': 4,
#               '2011': 4.25,
#               'Team': 'St. Louis Cardinals'},
# 'cubs': {'2009': 3, '2010': 4.25, '2011': 4.5, 'Team': 'Chicago Cubs'},
# 'diamondbacks': {'2009': 3.5,
#                  '2010': 2.75,
#                  '2011': 2.75,
#                  'Team': 'Arizona Diamondbacks'},
# 'dodgers': {'2009': 5, '2010': 5, '2011': 5, 'Team': 'Los Angeles Dodgers'},
# 'giants': {'2009': 4.25,
#            '2010': 4.5,
#            '2011': 4.75,
#            'Team': 'San Francisco Giants'},
# 'indians': {'2009': 4.25,
#             '2010': 4.25,
#             '2011': 4.25,
#             'Team': 'Cleveland Indians'},
# 'mariners': {'2009': 4.25,
#              '2010': 3.5,
#              '2011': 3.5,
#              'Team': 'Seattle Mariners'},
# 'marlins': {'2009': 5, '2010': 5, '2011': 5, 'Team': 'Florida Marlins'},
# 'mets': {'2009': 4.75, '2010': 5, '2011': 5, 'Team': 'New York Mets'},
# 'nationals': {'2009': 4.5,
#               '2010': 4.5,
#               '2011': 4.5,
#               'Team': 'Washington Nationals'},
# 'orioles': {'2009': 2.5,
#             '2010': 2.5,
#             '2011': 2.5,
#             'Team': 'Baltimore Orioles'},
# 'padres': {'2009': 4, '2010': 4, '2011': 4, 'Team': 'San Diego Padres'},
# 'phillies': {'2009': 3.75,
#              '2010': 3.75,
#              '2011': 3.75,
#              'Team': 'Philadelphia Phillies'},
# 'pirates': {'2009': 2.5,
#             '2010': 2.5,
#             '2011': 2.75,
#             'Team': 'Pittsburgh Pirates'},
# 'rangers': {'2009': 2.75,
#             '2010': 4.75,
#             '2011': 4.75,
#             'Team': 'Texas Rangers'},
# 'rays': {'2009': 5, '2010': 5, '2011': 5, 'Team': 'Tampa Bay Rays'},
# 'reds': {'2009': 1, '2010': 1, '2011': 1, 'Team': 'Cincinnati Reds'},
# 'redsox': {'2009': 4.5, '2010': 4.5, '2011': 4.5, 'Team': 'Boston Red Sox'},
# 'rockies': {'2009': 3.25,
#             '2010': 3.25,
#             '2011': 3.25,
#             'Team': 'Colorado Rockies'},
# 'royals': {'2009': 4, '2010': 4, '2011': 4, 'Team': 'Kansas City Royals'},
# 'tigers': {'2009': 3.5, '2010': 3, '2011': 4, 'Team': 'Detroit Tigers'},
# 'twins': {'2009': 3.5, '2010': 3.75, '2011': 3.75, 'Team': 'Minnesota Twins'},
# 'whitesox': {'2009': 3.25,
#              '2010': 3.25,
#              '2011': 3.5,
#              'Team': 'Chicago White Sox'},
# 'yankees': {'2009': 3, '2010': 3, '2011': 3, 'Team': 'New York Yankees'}}

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