var express = require('express');
var app =  express();
var request = require('request');
// var bodyParser = require('body-parser');

// app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//SEARCH
app.get("/", function(req,res) {
  res.render("search");
});


//RESULTS
app.get("/results", function(req,res) {
  var query = req.query.search;
  var url = 'http://omdbapi.com/?apikey=thewdb&s='+query;
  request(url, function(error,response, body) {
    if(!error && response.statusCode == 200) {
      var data = JSON.parse(body); //CONVERTS STRING INTO ACTUAL JSON
      // res.send(results["Search"][0]["Title"]);
      res.render('results',{data: data});
      // console.log(parsedData["query"]["results"]["channel"]["astronomy"]["sunset"]);  //Show the HTML body for the requested page
    }
  });
});


app.listen(3000, function() {
  console.log("SERVER HAS STARTED!");
});


// YAHOO WEATHER API
// request('https://query.yahooapis.com/v1/public/yql?q=select%20astronomy.sunset%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22maui%2C%20hi%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys', function(error, response, body) {
//   if(!error && response.statusCode == 200) {
//     var parsedData = JSON.parse(body); //CONVERTS STRING INTO ACTUAL JSON
//     console.log(parsedData["query"]["results"]["channel"]["astronomy"]["sunset"]);  //Show the HTML body for the requested page
//   }
// });

// OMDB MOVIE API 1
// request('http://omdbapi.com/?apikey=thewdb&i=tt0121766', function(error, response, body) {
//   if(!error && response.statusCode == 200) {
//     var parsedData = JSON.parse(body); //CONVERTS STRING INTO ACTUAL JSON
//     console.log(parsedData['Ratings'][0]['Source']);  //Select the requested object/array data
//     // console.log(parsedData["query"]["sunset"]);  //Show the HTML body for the requested page
//   }
// });




