import React from 'react';
import { useState, useRef } from 'react';
import axios from 'axios';

const projectName = "Song #2"

function App (props) {
  const [project, setProject] = useState(projectName)
  const [showForm, setShowForm] = useState(false);
  const [timeStamp, setTimeStamp] = useState(0);
  const [users, setUsers] = useState([ 'Brett', 'Jose', 'Mike', 'Doug' ]);
  const [activeUser, setActiveUser] = useState('Doug');

  return (
    <div>
      <div>DIFF_RNCE Audio Player 2</div>
      <div>{projectName}</div>
      <AudioPlayer setTimeStamp={(t)=>setTimeStamp(t)}/>

      <select onChange={(e) => setActiveUser(e.target.value)}>Select User
        {
          users.map((u, i) => <option value={u}>{u}</option>)
        }
      </select>
      <CommentForm timeStamp={timeStamp} activeUser={activeUser} />
    </div>
  );
}

export default App;


function CommentForm (props) {
  const [formInput, setFormInput] = useState({
    body: '',
    username: props.activeUser,
  });

  function submitComment () {

    axios({
      method: 'POST',
      url: '/api/comments',
      data: {...formInput, timeStamp: props.timeStamp}
    }).then((e, r)=>console.log(r));
  }

  return (
    <div  >
      <input
        type="text"
        placeholder="comment"
        onChange={(e)=>setFormInput({...formInput, body: e.target.value})}
      />
      <p>{props.timeStamp}</p>
      <button
        type="button"
        onClick={submitComment}
      >add comment</button>
    </div>
  );
}

function AudioPlayer (props) {

  const skipIncrement = 5;
  const player = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [seekValue, setSeekValue] = useState(0);

  function playPause() {
    isPlaying ? player.current.pause() : player.current.play();
    setIsPlaying(!isPlaying);
  }

  function timeStamp() {
    // console.log(player.current.currentTime);
    props.setTimeStamp(player.current.currentTime);
  }

  function onPlaying() {
    setCurrentTime(player.current.currentTime);
    setSeekValue(
      (player.current.currentTime / player.current.duration) * 100
    );
  }

  function skip(time) {
    let newTime = player.current.currentTime + time;
    player.current.currentTime = newTime;
    setCurrentTime(newTime);
  }

  return (
    <div>
      <audio
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        ref={player}
        onTimeUpdate={onPlaying}
      >
      </audio>
      {/* <br />
      <p>{currentTime}</p>
      <br /> */}
      <div>
        <button type="button" onClick={()=>skip(-1 * skipIncrement)}> {`<< ${skipIncrement}`} </button>
        <button type="button" onClick={playPause}> { !isPlaying ? 'play' : 'pause' } </button>
        <button type="button" onClick={timeStamp}>get</button>
        <button type="button" onClick={()=>skip(skipIncrement)}> {`${skipIncrement} >>`} </button>
      </div>
    </div>
  )
}