import { useState, useContext } from 'react'
import styled from "styled-components";
import { Link } from 'react-router-dom';
import axios from 'axios';

import NewFriendForm from './NewFriendForm'

import { Context } from '../App'

export default function Friend(props){
  const { user } = useContext(Context)
  const { friend, updateFriends } = props

  const [ editing, setEditing ] = useState(false)

  function toggleEditing(){
    setEditing(!editing)
  }

  function updateFriend(newFriend){
    axios.put(`http://localhost:5000/api/friends/${friend.id}`, newFriend, {headers: {authorization: user.token}})
      .then( res => {
        // console.log(res)
        updateFriends(res.data)
        toggleEditing()
      })
      .catch( err => {
        console.log(err)
      })
  }

  function deleteFriend(){
    if(window.confirm(`Are you sure you want to remove ${friend.name}?`))
      axios.delete(`http://localhost:5000/api/friends/${friend.id}`, {headers: {authorization: user.token}})
        .then( res => {
          updateFriends(res.data)
        })
        .catch( err => {
          console.log(err)
        })
  }

  return (
    <div>
      {editing 
        ? <div>
            <NewFriendForm cancel={toggleEditing} addFriend={updateFriend} values={friend} />
            <button style={{display: 'block'}} onClick={deleteFriend}>DELETE</button>
          </div>
        : <div>
          <div>
            <h3>{friend.name}</h3>
            <button onClick={toggleEditing}>Edit</button>
          </div>
          <p>{friend.age}</p>
          <p>{friend.email}</p>
        </div>
      }
    </div>
  )
}