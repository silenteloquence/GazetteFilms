const Film = require('../models/film');
const express = require('express');
const router = express.Router();


// GET /api/films
exports.getAllFilms = async (req, res) => {
    try {
        const films = await Film.find();
        res.json(films);
    } catch(err){
        res.status(500).json({message: err.message});
    }
};

// GET /api/films/:id
exports.getFilmById = async (req, res) => {
    try {
        const film = await Film.findById(req.params.id);
        
        if(film == null){
            return res.status(404).json({message: 'Product not found'});
        }

        res.json(product);

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
    });

    try {
        const newFilm = await film.save();
        res.status(201).json(newFilm);
    } catch(err){
        res.status(400).json({message: err.message});
    }
};