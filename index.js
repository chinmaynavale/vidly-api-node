const express = require('express');
const app = express();

app.use(express.json());

const genres = [
  { id: 1, name: 'Action' },
  { id: 2, name: 'Horror' },
  { id: 3, name: 'Romance' },
];

app.get('/api/genres', (req, res) => res.send(genres));

app.post('/api/genres', (req, res) => {
  const genre = {
    id: genres[genres.length - 1].id + 1,
    name: req.body.name,
  };
  genres.push(genre);

  res.send(genre);
});

app.put('/api/genres/:id', (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id));
  genre.name = req.body.name;

  res.send(genres);
});

app.delete('/api/genres/:id', (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id));
  genres.splice(genres.indexOf(genre), 1);

  res.send(genres);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
