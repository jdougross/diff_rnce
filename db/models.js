const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: String,
  users: [ userSchema ],
  audioFiles: [ audioFileSchema ],
  comments: [ commentSchema ]

});

const userSchema = new mongoose.Schema({
  name: String,
})

const audioFileSchema = new mongoose.Schema({
  name: String,
  url: String,
})

const commentSchema = new mongoose.Schema({
  commentOwner: String, //do we want this to be the users _id?  or index in [users]?
  status: Boolean,
  body: String,
  date: Number,
  thread_id: String,
  prev_id: String,
  next_id: String,
})

const Project = mongoose.model('Project', projectSchema);
const Comment = mongoose.model('Comment', commentSchema);
const AudioFile = mongoose.model('AudioFile', audioFileSchema);
const User = mongoose.model('User', userSchema);

module.exports = { Project, Comment, AudioFile, User };