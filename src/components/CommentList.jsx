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
  const { user, body, song_time, resolved } = props.comment;
  return (
    <div id={`${props.index}${user}`}>
      <div>{song_time}</div>
      <div>{body}</div>
      <div>{user}</div>
    </div>
  )
}

export default CommentList;