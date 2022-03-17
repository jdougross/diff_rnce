const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  user: String,
  resolved: Boolean,
  body: String,
  song_time: String,
}, { timestamps: { createdAt: 'created_at' } })

const threadSchema = new mongoose.Schema({
  // resolved: Boolean,
  song_time: String,
  comments: [ commentSchema ],
})

const Thread = mongoose.model('Thread', threadSchema);
const Comment = mongoose.model('Comment', commentSchema);

module.exports = { Thread, Comment };