import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';
import axios from 'axios';

import Friend from './Friend'
import NewFriendForm from './NewFriendForm'

import { Context } from '../App'

export default function Friends(){
  const { user } = useContext(Context)

  const [ friends, setFriends ] = useState([])
  const [ addingNewFriend, setAddingNewFriend ] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      getFriends()
    }, 500) // simulate delay in api call
  // probably not the right thing to do but I only want it to run once so eh...
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function getFriends(){
    axios.get('http://localhost:5000/api/friends', {headers: {authorization: user.token}})
      .then( res => {
        setFriends(res.data)
      })
      .catch( err => {
        console.log(err.response)
      })
  }

  function addFriend(newFriend){
    // console.log('called')
    axios.post('http://localhost:5000/api/friends', newFriend, {headers: {authorization: user.token}})
      .then( res => {
        console.log(res.data)
        setFriends(res.data)
        toggleAddingNewFriend()
      })
      .catch( err => {
        console.log(err)
      })
  }

  function toggleAddingNewFriend(){
    setAddingNewFriend(!addingNewFriend)
  }

  return (
    <div>
      <div>
        { addingNewFriend 
          ? <NewFriendForm cancel={toggleAddingNewFriend} addFriend={addFriend}/>
          : <button onClick={toggleAddingNewFriend}>Add New Friend</button>
        }
      </div>
      {friends.length === 0 ? 
        <h1>Loading...</h1> :
        friends.map( friend => <Friend key={friend.id} friend={friend} updateFriends={setFriends}/>)
      }
    </div>
  )
}