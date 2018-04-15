require("dotenv").config();

//======Variables=========================

// App imports
var keys = require("./keys.js");

//Node Pakcages
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');

//User inputs
var action = process.argv[2];
var input = process.argv[3];

//=============Main================

switch (action) {
    case "my-tweets":
      myTweets();
      break;
    
    case "spotify-this-song":
      spotifyThis(input);
      break;
    
    case "movie-this":
      movieThis(input);
      break;
    }

//=======================Functions==========================

function myTweets() {

    var client = new Twitter(keys.twitter);

    var params = {screen_name: 'tacomoose1'};

    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error && response.statusCode === 200) {

          tweets.forEach(function(element) {
            console.log(`${element.text} created at: ${element.created_at}`);
          });
        
        }
    });
}

function spotifyThis(song) {
    var spotify = new Spotify(keys.spotify);

    spotify
        .search({ type: 'track', query: song, limit: 1 })
        .then(function(response) { 
            console.log(`Song name: ${response.tracks.items[0].name}`);
            console.log(`Artist: ${response.tracks.items[0].album.artists[0].name}`);
            console.log(`Album: ${response.tracks.items[0].album.name}`);
            console.log(`Album link: ${response.tracks.items[0].album.external_urls.spotify}`)
        })
        .catch(function(err) {
            console.log(err);
        });
}

function movieThis(movieName) {

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    //Create a request to the queryUrl
    request(queryUrl, function(error, response, body){
        
        // If the request is successful
        if (!error && response.statusCode === 200) {

            // Then log the following for the movie: Title, Release year, IMDB Rating,
            // Rotten Tomatoes Rating, Country, Language, Plot, and Actors. 
            console.log(`Title: ${JSON.parse(body).Title}`);
            console.log(`Release Year: ${JSON.parse(body).Year}`);
            console.log(`IMDB Rating: ${JSON.parse(body).imdbRating}`);
            console.log(`Rotten Tomatoes Rating: ${JSON.parse(body).Ratings[2].Value}`);
            console.log(`Country: ${JSON.parse(body).Country}`);
            console.log(`Language: ${JSON.parse(body).Language}`);
            console.log(`Plot: ${JSON.parse(body).Plot}`);
            console.log(`Actors: ${JSON.parse(body).Actors}`);
        }
    })
};

// `do-what-it-says`
