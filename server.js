var express = require('express');
var url = require('url');
var request = require('request');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.all('/fetchCarsPost', function(req, res){
	var data=req.body;
    request.post({
	  headers: {'content-type' : 'application/json'},
	  url:     'http://54.208.111.147:8080/v1/service/viewrates',
	  body:    JSON.stringify(data)
	}, function(error, response, body){
	  console.log(body);
	   res.send(body);
	});
});
app.all('/getAirport', function(req, res){
    request.get({
	  headers: {'content-type' : 'application/json'},
	  url:     'http://54.208.111.147:8080/v1/place/airport ',
	}, function(error, response, body){
	  console.log(body);
	  res.send(body);
	});
});
app.all('/fetchCars', function(req, res, next){
	console.log('API CALL');
	var base_url = 'http://54.208.111.147:8080/v1/service/viewrates';
	
	var parts = url.parse(base_url, true);

	var headers = req.headers;
	//headers.host = 'api.forms.ge.com';
	//headers.referer = 'http://forms.ge.com/';
	//Since we are setting data in the query object test
	//we need to clear parts.search in order to always send the access_token added to the query object.
	//Refer to format documentation (http://nodejs.org/api/url.html#url_url_format_urlobj) for more info.
	parts.search = '';
	var options = {
	'uri': url.format(parts),
	'method': 'POST',
	'headers': headers,
	'data': req.data,
	'timeout': 20000,
	'jar': false,
	'pool': false
	};
	console.log(parts);
	console.log(options);
	console.log(req.data);

	return request(options).pipe(res);
});
app.use(express.static(__dirname + '/public'));
app.listen(3000);
console.log("App Server listening on 3000");