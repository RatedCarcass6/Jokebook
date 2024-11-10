const express = require('express');
const bodyParser = require('body-parser');
const jokeRoutes = require('./jokeRoutes');
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use('/jokebook', jokeRoutes);
app.use('/api', jokeRoutes);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});