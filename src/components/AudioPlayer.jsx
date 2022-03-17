import React from 'react';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import style from '../App.module.css';

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

export default AudioPlayer;