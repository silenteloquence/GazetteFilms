const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth')
const filmController = require('../controllers/film');

// define the routes (GET, POST, PUT, DELETE)
router.get('/', authMiddleware, filmController.getAllFilms)
router.get('/:id', authMiddleware, filmController.getFilmById)
router.post('/', authMiddleware, filmController.createFilm)
router.put('/:id', authMiddleware,  filmController.updateFilm);
router.delete('/:id', authMiddleware, filmController.deleteFilm);

module.exports = router;