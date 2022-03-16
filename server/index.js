const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.use(express.static('dist'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));

app.post('/api/comments', (req, res) => {
  console.log(req.body);
  res.send('added!');
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});