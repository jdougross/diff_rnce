const mongoose = require('mongoose');

// const projectSchema = new mongoose.Schema({
//   name: String,
//   users: [ userSchema ],
//   audioFiles: [ audioFileSchema ],
//   threads: [ threadSchema ],
//   // comments: [ commentSchema ]

// });
const commentSchema = new mongoose.Schema({
  user: String,
  resolved: Boolean,
  body: String,
  // date: Number,
  // thread_id: String,
})

const threadSchema = new mongoose.Schema({
  // resolved: Boolean,
  timeStamp: String,
  comments: [ commentSchema ],
  // comments: [
  //   {
  //     user: String,
  //     status: Boolean,
  //     body: String,
  //   }
  // ],
})

// const userSchema = new mongoose.Schema({
//   name: String,
// })

// const audioFileSchema = new mongoose.Schema({
//   name: String,
//   url: String,
// })



// const Project = mongoose.model('Project', projectSchema);
const Thread = mongoose.model('Thread', threadSchema);
const Comment = mongoose.model('Comment', commentSchema);
// const AudioFile = mongoose.model('AudioFile', audioFileSchema);
// const User = mongoose.model('User', userSchema);

// module.exports = { Project, Thread, Comment, AudioFile, User };
module.exports = { Thread, Comment };