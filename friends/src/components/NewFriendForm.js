import { useState } from 'react'
import styled from "styled-components"
import { Link } from 'react-router-dom'
import axios from 'axios'

const initialValues = {
  name: '',
  age: '',
  email: '',
}

export default function NewFriendForm(props){
  const [ values, setValues ] = useState(props.values !== undefined ? props.values : initialValues)

  function onChange(evt) {
    const { name, value } = evt.target
    setValues({ ...values, [name]: value })
  }

  function onSubmit(evt){
    evt.preventDefault()
    props.addFriend(values)
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <button type='button' onClick={props.cancel}>Cancel</button>
        <label>
            Name
            <input 
              type='text'
              name='name'
              value={values.name}
              onChange={onChange}
            />
          </label>
          <label>
            Age
            <input 
              type='text'
              name='age'
              value={values.age}
              onChange={onChange}
            />
          </label>
          <label>
            Email
            <input 
              type='text'
              name='email'
              value={values.email}
              onChange={onChange}
            />
          </label>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}