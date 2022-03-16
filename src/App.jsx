import React from 'react';
import { useState, useRef } from 'react';
import axios from 'axios';
import style from './App.module.css';
// import utils from './components/utils.js';

const projectName = "Song #2"

function App (props) {
  const [project, setProject] = useState(projectName)
  const [showForm, setShowForm] = useState(false);
  const [timeStamp, setTimeStamp] = useState(0);
  const [users, setUsers] = useState([ 'Brett', 'Jose', 'Mike', 'Doug' ]);
  const [activeUser, setActiveUser] = useState('Brett');

  return (
    <div className={style.App}>
      <div className={style.title}>DIFF_RNCE</div>
      <div className={style.projectName}>{projectName}</div>
      <AudioPlayer
        setTimeStamp={(t)=>setTimeStamp(t)}/>
      <UserForm
        users={users} setActiveUser={setActiveUser} />
      <CommentForm
        timeStamp={timeStamp} activeUser={activeUser} project={project} />
    </div>
  );
}

export default App;

function UserForm (props) {
  return (
    <select
      className={style.userForm}
      onChange={(e) => props.setActiveUser(e.target.value)}
    >Select User
      {
        props.users.map((u, i) => <option key={`${u}${i}`} value={u}>{u}</option>)
      }
    </select>
  );
}

function CommentForm (props) {
  const [formInput, setFormInput] = useState({
    body: '',
    // username: props.activeUser,
  });

  function submitComment () {
    const comment = {
      project: props.project,
      user: props.activeUser,
      timeStamp: props.timeStamp,
      body: formInput.body,
      date: new Date(),
      parent: null,
      next: null,
    }

    axios({
      method: 'POST',
      url: '/api/comments',
      data: { comment }
    }).then((e, r)=>console.log(r));
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

function AudioPlayer (props) {

  const songs = [
    {title: 'Song 1', url:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'},
    {title: 'Song 2', url:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'},
    {title: 'Song 3', url:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'},
  ]

  const skipIncrement = 5;
  const player = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  // const [seekValue, setSeekValue] = useState(0);

  function playPause() {
    isPlaying ? player.current.pause() : player.current.play();
    setIsPlaying(!isPlaying);
  }

  function timeStamp() {
    // console.log(player.current.currentTime);
    let t = player.current.currentTime;
    let m = Math.floor(t/60);
    let s = Math.floor(t % 60);

    let min = m >= 10 ? `${m}` : m > 0 ? `0${m}` : '00';
    let sec = s >= 10 ? `${s}` : s > 0 ? `0${s}` : '00';
    props.setTimeStamp(`${min}:${sec}`);
  }

  function onPlaying() {
    setCurrentTime(player.current.currentTime);
    // setSeekValue(
    //   (player.current.currentTime / player.current.duration) * 100
    // );
  }

  function skip(time) {
    let newTime = player.current.currentTime + time;
    player.current.currentTime = newTime;
    setCurrentTime(newTime);
  }

  return (
    <div>
      <audio
        src={songs[0].url}
        ref={player}
        onTimeUpdate={onPlaying}
      >
      </audio>
      {/* <br />
      <p>{currentTime}</p>
      <br /> */}
      <div className={style.audioPlayer}>
        <button className={style.button}  type="button" onClick={()=>skip(-1 * skipIncrement)}> {`<< ${skipIncrement}`} </button>
        <button className={style.button}  type="button" onClick={playPause}> { !isPlaying ? 'play' : 'pause' } </button>
        <button className={style.button} type="button" onClick={timeStamp}>get</button>
        <button className={style.button}  type="button" onClick={()=>skip(skipIncrement)}> {`${skipIncrement} >>`} </button>
      </div>
    </div>
  )
}