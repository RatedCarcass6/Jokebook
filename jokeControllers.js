const JokeModel = require('./jokebookModel'); // Import the JokeModel

const JokeController = {
  getCategories: (req, res) => {
    JokeModel.getCategories((err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows.map(row => row.name));
    });
  },

  getJokesByCategory: (req, res) => {
    const { category } = req.params;
    const { limit } = req.query;

    JokeModel.getJokesByCategory(category, limit, (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      if (rows.length === 0) return res.status(404).json({ error: "Category not found" });
      res.json(rows);
    });
  },

  addJoke: (req, res) => {
    const { category, setup, delivery } = req.body;
    if (!category || !setup || !delivery) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    JokeModel.addJoke(category, setup, delivery, (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  },

  getRandomJoke: async (req, res) => {
    try {
      const joke = await JokeModel.getRandomJoke();
      res.json(joke);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

// Export the JokeController
module.exports = JokeController;