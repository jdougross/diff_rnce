const models = require('../db/models.js');

const { Thread, Comment } = models;

exports.getAllComments = async () => {
  // return await Thread.find({});
  return await Comment.find({});

}

exports.addComment = async (r) => {
  r.resolved = false;
  // console.log('ctrl')
  // return await Comment.create(r);
  Comment.create(r).then(() => 'done');

}

// add comment at timestamp
// respond to comment

// post new version of song

// update status of thread as addressed / approved?
// update comment

// get all comments for a track






// ------------------------------------
// will probably handle these by sorting through state

// get all unresolved comments
// get all comments by a user
// get all comments per file