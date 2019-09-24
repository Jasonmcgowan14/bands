require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var axios = require("axios");
var fs = require("fs");
var moment = require("moment");
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

    request("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp", function (error, response, data) {
        try {
            var response = JSON.parse(data)
            if (response.length != 0) {
                console.log(`Upcoming concerts include: `)
                response.forEach(function (element) {
                    console.log("Venue name: " + element.venue.name);
                    if (element.venue.country == "United States") {
                        console.log("City: " + element.venue.city + ", " + element.venue.region);
                    } else {
                        console.log("City: " + element.venue.city + ", " + element.venue.country);
                    }
                    console.log("Date: " + moment(element.datetime).format('MM/DD/YYYY'));
                    console.log();
                })
            } else {
                console.log("No upcoming concerts");
            }
        }
        catch (error) {
            console.log("No upcoming concerts");
        }
    });
}

var moviesearch = function(movie){
    axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&tomatoes=true&apikey=trilogy").then(
    function(response) {
    
    console.log('===================================');
    console.log("Title: " + response.data.Title);
    console.log("Release year: " + response.data.Year);
    console.log("The movie's iMDB rating is: " + response.data.imdbRating);
    console.log("The movie's rotten tomato ratting is: " + response.data.TomatoRating);
    console.log("The movie is from the: " + response.data.Country);
    console.log("The movie is avialable in the following languages: " + response.data.Language);
    console.log("Plot: " + response.data.Plot);
    console.log("Actors: " + response.data.Actors);
    console.log('===================================');
  });
}


function dowhat() {
    fs.readFile("random.txt", "utf8", function (err, data) {
      data = data.split(",");
      var searchtype = data[0]
      var searchcontent = data[1]
      switch (searchtype) {
            case "concert-this":
                concertsearch(searchcontent)
            break;
            case "spotify-this-song":
                spotifysearch(searchcontent);
            break;
            case "movie-this":
                moviesearch(searchcontent)
            break;
      }
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
        case "do-what-it-says":
            dowhat()
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