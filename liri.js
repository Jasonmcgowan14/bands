require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var axios = require("axios");
var fs = require("fs");
var moment = require("moment");
var dotenv = require("dotenv");
var spotify = new Spotify(keys.spotify);
var request = require("request");

var spotifysearch = function(song){
    spotify.search({ type: 'track', query: song }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        var returnitems = data.tracks.items;
            for (let index = 0; index < returnitems.length; index++) {
                console.log("song name: " + song);
                console.log("preview song: " + returnitems[index].preview_url);
                console.log("album: " + returnitems[index].album.name);
                console.log(returnitems[index].album.name);
                console.log("-----------------------------------");
            }
    })
}

var concertsearch = function(artist){

}

var moviesearch = function(movie){
    var queryUrlMovie = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&tomatoes=true&apikey=trilogy";
    request(queryUrlMovie, function(error, response){
            
        
        console.log('===================================');
        console.log(response.body)
        console.log('===================================');

    });
}

var searchtype = function(searchtype,searchcontent){
    switch (searchtype){
        case "concert-this":
            concertsearch(searchcontent)
        break;
        case "spotify-this-song":
            spotifysearch(searchcontent);
        break;
        case "movie-this":
            moviesearch(searchcontent)
        break;
        default: 
            console.log("Not a valid command");
        break;
    }
}

var search = function(argone,argtwo){
    searchtype(argone,argtwo)

}


search(process.argv[2], process.argv.slice(3).join(" "));