var express = require('express');
var url = require('url');
var request = require('request');
var app = express();
var bodyParser = require('body-parser');
const https = require('https');
var fs = require('fs');
var stripe = require("stripe")("sk_test_AbFTeG4PHci423Skt2N85eSR");
var exphbs  = require('express-handlebars');
//var cons = require('consolidate'),

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.all('/charge', function(req, res){
    console.log(req.body.stripeToken);
    var stripeToken = req.body.stripeToken;
    var stripeEmail = req.body.stripeEmail;
    var charge = stripe.charges.create({
	  amount: 12300, // amount in cents, again
	  currency: "usd",
	  source: stripeToken,
	  description: "Example charge"+stripeEmail
	 // metadata: {'order_id': '6735'}
	}, function(err, charge) {
	  if (err && err.type === 'StripeCardError') {
	    // The card has been declined
	    res.send(err);
	  }else if(charge && charge.status==='paid'){
 		//res.send(charge);
 		res.setHeader("Content-Type", "text/html");
 		res.render('main',charge);
	  }
	});
	
});

app.all('/signUp', function(req, res){
	var data=req.body;
	request.post({
	  headers: {'accept' : 'application/json;charset=UTF-8','content-type' : 'application/json'},
	  url:     'http://54.208.111.147:8080/v1/signUp',
	  body:    JSON.stringify(data)
	}, function(error, response, body){
		//console.log('response::::'+response);
	  	//console.log('body::::'+body);
	   	res.send(body);
	});
});
app.all('/proxy/*', function(req, res){
	var base_url = req.url.replace('/proxy/','');
	base_url = 'http://54.208.111.147:8080/'+base_url;
	console.log(base_url);
	console.log(req.method);
	if(req.method==='GET'){
		request.get({
		  headers: {'content-type' : 'application/json'},
		  url: base_url,
		}, function(error, response, body){
		  res.send(body);
		});
	}else if(req.method  ==='POST'){
		var data=req.body;
	    request.post({
		  headers: {'content-type' : 'application/json'},
		  url:     base_url,
		  body:    JSON.stringify(data)
		}, function(error, response, body){
		   res.send(body);
		});
	}
});
app.all('/fetchCaggrsPost', function(req, res){
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
app.all('/getAllReservations', function(req, res){
	var data=req.body;
    request.post({
	  headers: {'content-type' : 'application/json'},
	  url:     'http://54.208.111.147:8080/v1/reservations?offset=0&limit=3',
	  body:    JSON.stringify(data)
	}, function(error, response, body){
	  console.log(body);
	   res.send(body);
	});
});
app.all('/getAirport', function(req, res){
    request.get({
	  headers: {'content-type' : 'application/json'},
	  url:     'http://54.208.111.147:8080/v1/place/airport',
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
//https.createServer(httpsOptions, app).listen(4433);