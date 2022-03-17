const express = require('express');
const axios = require('axios');
const db = require('../db/index.js');
const ctrl = require('./controller.js')
const { Thread, Comment } = require('../db/models.js');

const app = express();
const PORT = 3000;

app.use(express.static('dist'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));

app.post('/api/comments', (req, res) => {
  Comment.create(req.body)
    .then((e, q) =>
      e ? res.send(e) : res.send(null, q));
});

app.get('/api/comments', (req, res) => {
  Comment.find({})
    .sort({ updatedAt: 'desc' })
    .then((e, q) =>
    e ? res.send(e) : res.send(null, q));
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});