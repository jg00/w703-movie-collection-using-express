class Movie {
    constructor(title, description, genre, posterURL){
        this.id = Date.now();
        this.title = title;
        this.description = description;
        this.genre = genre;
        this.posterURL = posterURL;
    }
}

module.exports = Movie;