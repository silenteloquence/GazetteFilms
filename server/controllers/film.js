const Film = require('../models/film');
const Auth = require('../middlewares/auth');
const express = require('express');
const router = express.Router();


// GET /api/films
exports.getAllFilms = async (req, res) => {
    try {
        const films = await Film.find({ user: req.user.username });
        
        res.json(films);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



// GET /api/films/:id
exports.getFilmById = async (req, res) => {
    try {
        const film = await Film.findById(req.params.id);
        //If film is null or not created by this user, return message film not found
        if(film == null || film.user !== req.user.username){
            return res.status(403).json({ message: 'Film not found' });
        }
        res.json(film);

    } catch(err){
        res.status(500).json({message: err.messasge});
    }
};

// POST /api/films
exports.createFilm = async (req, res) => {
    const film = new Film({
        name: req.body.name,
        released: req.body.released,
        genre: req.body.genre,
        stars: req.body.stars,
        user: req.user.username
    });

    try {
        const newFilm = await film.save();
        res.status(201).json(newFilm);
    } catch(err){
        res.status(400).json({message: err.message});
    }
}


// PUT /api/films/:id
exports.updateFilm = async (req, res) => {
    try {
        const film  = await Film.findById(req.params.id);

        if(film == null || film.user !== req.user.username){
            return res.status(403).json({ message: 'Film not found' });
        }

        if(req.body.name != null){
            film.name = req.body.name;
        }

        if(req.body.released != null){
            film.released = req.body.released;
        }

        if(req.body.genre != null){
            film.genre = req.body.genre;
        }

        if(req.body.stars != null){
            film.stars = req.body.stars;
        }

        const updateFilm = await film.save();
        
        res.json(updateFilm);
    }
    catch(err){
        res.status(400).json({message: err.message});
    }
}

// DELETE /api/films/:id
exports.deleteFilm = async (req, res) => {
    try {
        const film = await Film.findById(req.params.id);

        if(film == null || film.user !== req.user.username){
            return res.status(403).json({ message: 'Film not found' });
        }

        await Film.findByIdAndDelete(req.params.id);

        res.json({message: 'Film deleted successfully'});
    } catch(err){
        res.status(500).json({message: err.message});
    }
};

