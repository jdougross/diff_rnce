import React from 'react';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import style from '../App.module.css';

function CommentForm (props) {
  const [formInput, setFormInput] = useState({
    body: '',
  });

  function submitComment () {
    const comment = {
      user: props.activeUser,
      song_time: props.timeStamp,
      body: formInput.body,
    }
    console.log(comment);
    axios({
      method: 'POST',
      url: '/api/comments',
      data: comment
    })
      // .then((e, r)=>console.log(r));
      .then(()=>props.getAllComments());
  }

  return (
    <div className={style.commentForm}>
      <input
        type="text"
        placeholder="comment"
        onChange={(e)=>setFormInput({...formInput, body: e.target.value})}
      />
      <p>{props.timeStamp}</p>
      <button
        className={style.button}
        type="button"
        onClick={submitComment}
      >add comment</button>
    </div>
  );
}

export default CommentForm;