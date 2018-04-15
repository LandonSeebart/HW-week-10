//To do
//* If no song is provided then your program will default to "The Sign" by Ace of Base
//* If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
//* Finish do what it says function

require("dotenv").config();

//===========Variables============
//User Variables
const action = process.argv[2];
let input = ""

//Local imports
var keys = require("./keys.js");

//Node Packages
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');

//=============Main================

cleanInput(process.argv);

chooseAction(action, input);

//=============Functions===========

//Song and movie titles can contain more than one word so we cannot set input
// equal to process.argv[3].  This function collects argv[i] greater than 2 and
//concatonates them into one string that can be called by other functions.
function cleanInput(nodeArgs){
    for (var i = 3; i < nodeArgs.length; i++) {
        if (i > 3 && i < nodeArgs.length) {
            input = input + "+" + nodeArgs[i];
        } else {
            input += nodeArgs[i];
        }
    }
}

//This application preforms several functions based on the user's input.
//chooseAction evaluates that input and triggers the correct function.
function chooseAction(action, input) {
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

//Calls user's twitter API and returns up to 20 most recent tweets
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

//Takes song name, queries Spotify database, returns one search result,
//and displays key information in the console.
function spotifyThis(song) {
    
    var spotify = new Spotify(keys.spotify);

    spotify
        .search({ type: 'track', query: song, limit: 1 })
        .then(function(response) { 
            console.log(
                `\nSong name: ${response.tracks.items[0].name}
                \nArtist: ${response.tracks.items[0].album.artists[0].name}
                \nAlbum: ${response.tracks.items[0].album.name}
                \nAlbum link: ${response.tracks.items[0].album.external_urls.spotify}\n`
            )
        })
        .catch(function(err) {
            console.log(err);
        });
}

//Takes a movie name, queryies OMDB, and displays key information in the console.
function movieThis(movieName) {

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    //Create a request to the queryUrl
    request(queryUrl, function(error, response, body){
        
        // If the request is successful
        if (!error && response.statusCode === 200) {

            // Then log the following for the movie: Title, Release year, IMDB Rating,
            // Rotten Tomatoes Rating, Country, Language, Plot, and Actors. 
            console.log(
                `\nTitle: ${JSON.parse(body).Title}
                \nRelease Year: ${JSON.parse(body).Year}
                \nIMDB Rating: ${JSON.parse(body).imdbRating}
                \nRotten Tomatoes Rating: ${JSON.parse(body).Ratings[2].Value}
                \nCountry: ${JSON.parse(body).Country}
                \nLanguage: ${JSON.parse(body).Language}
                \nPlot: ${JSON.parse(body).Plot}
                \nActors: ${JSON.parse(body).Actors}\n`
            );
        }
    })
};

// `do-what-it-says`
