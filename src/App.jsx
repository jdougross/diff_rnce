import React from 'react';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import style from './App.module.css';
// import utils from './components/utils.js';

import AudioPlayer from './components/AudioPlayer.jsx';
import CommentList from './components/CommentList.jsx';
import CommentForm from './components/CommentForm.jsx';
import UserForm from './components/UserForm.jsx';

const projectName = "Song #2"

function App (props) {
  const [project, setProject] = useState(projectName)
  const [showForm, setShowForm] = useState(false);
  const [timeStamp, setTimeStamp] = useState(0);
  const [users, setUsers] = useState([ 'Brett', 'Jose', 'Mike', 'Doug' ]);
  const [activeUser, setActiveUser] = useState('Brett');
  const [comments, setComments] = useState();

  function getAllComments() {
    axios({
      method: 'GET',
      url: '/api/comments'
    }).then((queryResp) => setComments(queryResp.data));
  }

  useEffect(getAllComments, []);

  return (
    <div className={style.App}>
      <div className={style.title}>DIFF_RNCE</div>
      <div className={style.projectName}>{projectName}</div>
      <AudioPlayer
        setTimeStamp={(t)=>setTimeStamp(t)}/>
      <UserForm
        users={users}
        setActiveUser={setActiveUser} />
      <CommentForm
        timeStamp={timeStamp}
        activeUser={activeUser}
        project={project}
        getAllComments={getAllComments} />
      <CommentList comments={comments}/>
    </div>
  );
}

export default App;







