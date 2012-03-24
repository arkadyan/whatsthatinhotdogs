"""
Parse the salary data and generate a report with the costs in hotdogs
for all MLB players in 2011.
"""
import csv
import sys
import json

from utils import *
data = open(sys.argv[1])

full_data = open(sys.argv[2])

#Elements we want.  
gets = ['Dog', 'Cap', 'Drink', 'Beer', 'Parking', 'Ticket']

costs = {}
for row in csv.DictReader(full_data):
	year = row['Year']
	if year != '2011':
		continue
	tid = row['Short Name']
	costs[tid] = {}
	for g in gets:
		costs[tid].update({g: row[g]})
		#print row[g],
	#print

#List for the output.  
new = []
#List of tuples for sorting
tups = []

for row in json.load(data)['salaries'][0]['salary']:
    #print row['salaries']
    #pass
    d = {}
    for k,v in row.items():
        if k in ['player_full_name',
                 'salary',
                 'player',
                 'team_full_name',
                 'team_first_name',
                 'team_last_name']:
            if k == 'player':
                k = 'slug'
            d.update({k:v})
    year = 2011
    team_name = d['team_last_name'].lower().replace(' ', '')
    hotdog_price = hotdog_data[team_name][str(year)]
    d['hotdog_salary'] = get_hotdog_salary(d['salary'], hotdog_price)
    d['hotdog_price'] = hotdog_price
    for g in gets:
    	item = g.lower()
    
    	d[item] = costs[team_name][g]
    	price = costs[team_name][g]
    	salary = int(d['salary'].replace(',', ''))
    	salary_label = '%s_salary' % item
    	d[salary_label] = get_hotdog_salary(d['salary'], float(price))
    new.append(d)
    tups.append((d['player_full_name'],
                d['salary'],
                d['hotdog_salary'],
                hotdog_price))

print json.dumps(new)
#print new

#sort = sorted(tups, key=lambda tups: tups[2], reverse=True)

#for p, salary, hs, price in sort:
#    print p, salary, hs, price
