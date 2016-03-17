# Geolocation
A very lightweight HTML5 Geolocation library


The library handles:

	- HTML Geolocation
	- Browser compatibility
	- Error logging
	- User permission
	- Basic session storage for easy location and error logging


### Usage

See the test code within geo.js:130+

1: Make sure geo.js is loading or included within your web project's JavaScript.

2: Create a `var obj = new Geo()` object then call HTML's geolocation functionality with `obj.location();` to query the user for location permission. 

3: Since you cannot then expect the user to give permission you must put your geo functionality within `obj.ready(){...}` this way code expecting access to a position object will not fire until it is truly available.

4: Confirm geolocation availability with the boolean `object.hasGeo`


### Please feel free to contribute, improvements welcome.


