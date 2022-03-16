const mongoose = require('mongoose');

const mongoURI = 'mongodb://localhost:27017/diff_rnce';

const db = mongoose.connect(mongoURI, { useNewUrlParser: true });

db
  .then( (db) => console.log(`Connected to mongo at ${mongoURI}`))
  .catch((err) => {
    console.log(`Problem connecting to mongo at ${mongoURI}`);
    console.log(err)
  });

  module.exports = db;