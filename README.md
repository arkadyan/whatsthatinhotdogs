What's That in Hot Dogs?

[Prices of Hot Dogs at MLB Parks in 2011](https://gist.github.com/2182947)

[All Salaries](https://gist.github.com/e85e361c59be01ec5329)

[Prices of Hot Dogs, Beer, Tickets from 2003 to 2011](https://gist.github.com/2187434)

[Hot Dog Raphael Plugin](https://gist.github.com/2183517)

Basic API to pull data from USA Today sports salary API and add ballpark hotdog price data.  Returns JSON.  Supports JSONP.
Data is available from 2003 to 2011.  

* Lookup team - defaults to most recent completed season

 * http://severe-mist-9223.herokuapp.com/team/redsox

* Will also take a year parameter

 * http://severe-mist-9223.herokuapp.com/team/cubs/2009

* JSONP
 * http://severe-mist-9223.herokuapp.com/team/cubs/2009?calback=?