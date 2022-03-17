import React from 'react';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import style from '../App.module.css';


function CommentList (props) {
  const [showResolved, setShowResolved] = useState(true);
  const comments = showResolved ?
    props.comments :
    props.comments.filter((c) => !c.resolved);

  function showHideResolved () {
    setShowResolved(!showResolved);
  }

  return (
    <div>
      <button
        className={style.button}
        onClick={showHideResolved}
        >{showResolved ? 'hide resolved' : 'show resolved' }
      </button>

      {
        comments?.map((c, i) =>
          <Comment comment={c} index={i}/> )
      }
    </div>
  )
}

function Comment (props) {
  const [resolved, setResolved] = useState(props.comment.resolved);
  const { user, body, song_time, _id } = props.comment;

  function resolveButton() {
    // setResolved(!resolved);
    axios({
      method: 'PUT',
      url: '/api/comments',
      params: {
        _id: _id,
        resolved: !resolved
      }
    })
    .then((r) => setResolved(r.data.resolved));
  }

  return (
    <div
      className={`${style.comment} ${
        resolved ?
        style.comment_resolved : style.comment_unresolved}`
      }
      id={`${props.index}${user}`}>

      <div
        className={style.comment_songTime}
        >{song_time}
      </div>
      <button
        className={
          `${style.button} ${style.comment_resolveButton}`}
        onClick={resolveButton}
        >{resolved ? 'resolved' : 'needs attention'}</button>

      <div
        className={style.comment_body}
        >{body}
      </div>
      <div
        className={style.comment_user}
        >{user}
      </div>
    </div>
  )
}

export default CommentList;