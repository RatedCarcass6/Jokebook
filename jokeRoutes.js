const express = require('express');
const router = express.Router();
const JokeController = require('./jokeControllers'); // Import the JokeController

// GET categories
router.get('/categories', JokeController.getCategories);

// GET jokes by category with optional limit
router.get('/jokes/:category', JokeController.getJokesByCategory);

// POST new joke
router.post('/jokes/new', JokeController.addJoke);

// GET a random joke
router.get('/random', JokeController.getRandomJoke);

module.exports = router;