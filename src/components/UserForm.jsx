import React from 'react';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import style from '../App.module.css';

function UserForm (props) {
  return (
    //select value={activeUser} ?
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

export default UserForm;