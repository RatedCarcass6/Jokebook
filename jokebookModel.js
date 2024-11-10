const db = require('./jokebookDB');

const JokeModel = {
  getCategories: (callback) => {
    db.all("SELECT name FROM categories", [], callback);
  },
  getJokesByCategory: (category, limit, callback) => {
    const query = `
      SELECT setup, delivery FROM jokes 
      INNER JOIN categories ON jokes.category_id = categories.id 
      WHERE categories.name = ? 
      LIMIT ?`;
    db.all(query, [category, limit || -1], callback);
  },
  addJoke: (category, setup, delivery, callback) => {
    db.get("SELECT id FROM categories WHERE name = ?", [category], (err, row) => {
      if (row) {
        db.run(
          "INSERT INTO jokes (category_id, setup, delivery) VALUES (?, ?, ?)",
          [row.id, setup, delivery],
          function (err) {
            if (err) return callback(err);
            JokeModel.getJokesByCategory(category, -1, callback);
          }
        );
      } else {
        callback(new Error("Category does not exist"));
      }
    });
  },
  getRandomJoke: () => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM jokes ORDER BY RANDOM() LIMIT 1';
      db.get(query, (err, row) => {
        if (err) return reject(new Error('Error fetching random joke: ' + err.message));
        resolve(row);
      });
    });
  }
};

module.exports = JokeModel;