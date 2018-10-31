const express = require('express');
const app = express();
const port = 3000;


const mustacheExpress = require('mustache-express')
// setting the templating engine as mustache
app.engine('mustache',mustacheExpress())
// telling express that all the views (pages) will be inside
// views directory
app.set('views','./views')
// set the view engine to mustache
app.set('view engine','mustache')


const bodyParser = require('body-parser')
// this adds the ability to parse the body
app.use(bodyParser.urlencoded({ extended: false }))


app.use(express.static('css'))


const Movie = require('./movie')


let movieCollection = [];


app.get('/', (req,res) => {
    res.render("index", {movieCollection: movieCollection});
});


app.get('/sortByGenre', (req,res) => {
    let sortByGenre = req.query.sortByGenre;

    movieCollectionSorted = movieCollection.filter(function(movie){
            return movie.genre === sortByGenre
    });

    if (sortByGenre === "All")
        res.redirect("/");
    
    res.render("index", {movieCollection: movieCollectionSorted});
});


app.post('/addMovie', (req,res) => {
    let title = req.body.title;
    let description = req.body.description;
    let genre = req.body.genre;
    let posterURL = req.body.posterURL;

    let movie = new Movie(title, description, genre, posterURL)
    movieCollection.push(movie);

    res.redirect('/');
}); 


app.post('/deleteMovie', (req,res) => {

    let id = req.body.id;

    let getObjIfExists = movieCollection.find(function(movie){
        return movie.id === parseInt(id)
    });

    let indexOfObj = movieCollection.indexOf(getObjIfExists)
    movieCollection.splice(indexOfObj,1)

    res.redirect("/");
});


app.get('/movieDetails/:id', (req,res) => {

    let id = req.params.id;

    let getObjIfExists = movieCollection.find(function(movie){
        return movie.id === parseInt(id)
    });

    res.render("movieDetails", {getObjIfExists});
});


app.listen(port, () => {
    console.log("Server started");
})




