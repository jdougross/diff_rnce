import React from 'react';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import style from '../App.module.css';


function CommentList (props) {
  return (
    <div>
      {
        props.comments?.map((c, i) =>
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
      className={style.comment}
      id={`${props.index}${user}`}>
      <div>{song_time}</div>
      <button
        onClick={resolveButton}
        >{resolved ? 'resolved' : 'needs attention'}</button>

      <div>{body}</div>
      <div>{user}</div>
    </div>
  )
}

export default CommentList;