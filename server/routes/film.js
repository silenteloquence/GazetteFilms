const express = require('express');
const router = express.Router();
const filmController = require('../controllers/film');

// define the routes (GET, POST, PUT, DELETE)
router.get('/', filmController.getAllFilms)
router.get('/:id', filmController.getFilmById)
router.put('/', filmController.createFilm)
router.put('/:id',  filmController.updateFilm);
router.delete('/:id', filmController.deleteFilm);

module.exports = router;