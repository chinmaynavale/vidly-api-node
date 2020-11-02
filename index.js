const Joi = require('joi');
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
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.message);

  const genre = {
    id: genres[genres.length - 1].id + 1,
    name: req.body.name,
  };
  genres.push(genre);
  res.send(genre);
});

app.put('/api/genres/:id', (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send('The genre with the given ID was not found.');

  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.message);

  genre.name = req.body.name;
  res.send(genres);
});

app.delete('/api/genres/:id', (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send('The genre with the given ID was not found.');

  const { error } = validateGenre(genre);
  if (error)
    return res.status(400).send('The genre with the given ID was not found.');

  genres.splice(genres.indexOf(genre), 1);
  res.send(genres);
});

app.get('/api/genres/:id', (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send('The genre with the given ID was not found.');

  res.send(genre);
});

const validateGenre = genre => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(genre);
};

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
