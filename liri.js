//To do
//* If no song is provided then your program will default to "The Sign" by Ace of Base
//* If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
//* Finish do what it says function

require("dotenv").config();

//======Variables=========================

// Local imports
var keys = require("./keys.js");

//Node Packages
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');


//=============Main================
cleanInput(process.argv);

//=============Functions===========

function cleanInput(nodeArgs){
    let input = ""
    const action = process.argv[2];

    for (var i = 3; i < nodeArgs.length; i++) {
        if (i > 3 && i < nodeArgs.length) {
            input = input + "+" + nodeArgs[i];
        } else {
            input += nodeArgs[i];
        }
    }
    chooseAction(action, input);
}

function chooseAction(action, input) {
    console.log(`action: ${action}`);
    console.log(`input: ${input}`);

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
}

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
