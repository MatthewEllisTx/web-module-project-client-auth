import React, { useState, useContext } from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';
import axios from 'axios';

import { Context } from '../App'

import schema from '../schema/loginSchema';

import eyeVisible from '../assets/iconmonstr-eye-thin.svg';
import eyeNotVisible from '../assets/iconmonstr-eye-off-thin.svg';


const initialValues = {
   username: '',
   password: '',
};

const initialFocus = {
   username: false,
   password: false,
};

export default function LoginPage(props){
   const { setUser } = useContext(Context)

   const [values, setValues] = useState(initialValues);
   const [focus, setFocus] = useState(initialFocus);
   const [errors, setErrors] = useState([]);
   const [passwordVisible, setPasswordVisible] = useState(false);

   // console.log(props)

   function togglePasswordVisibilty(){
      setPasswordVisible(!passwordVisible);
   }

   function onChange(evt) {
      const { name, value } = evt.target;
      setValues({ ...values, [name]: value });
   }

   function onFocus(evt) {
      const { name } = evt.target;
      setFocus({ ...initialFocus, [name]: true });
   }

   function onBlur(evt) {
      setFocus(initialFocus);
   }

   function onSubmit(evt) {
      evt.preventDefault();

      try {
         schema.validateSync(values, { abortEarly: false });
      } catch (err) {
         const list = err.inner.map((error) => error.errors[0]);
         setErrors(list);
         return
      }

      axios.post('http://localhost:5000/api/login', values)
        .then( res => {
            console.log(res)
            setUser({
              username: values.username,
              token: res.data.payload
            })
            setErrors([])
            props.history.push('/friends')
        })
        .catch( err => {
          console.log(err.response.data.error)
          setErrors([err.response.data.error])
        })
   }

   return (
     <DivMainStyled>
      <DivFlexStyled>
         <DivFlexGrowStyled>
            <DivToggleFormStyled>
               <LinkStyled to={'#'}>Register</LinkStyled>
            </DivToggleFormStyled>

            <H1TitleStyled>Login</H1TitleStyled>

            <form onSubmit={onSubmit} id='login'>
               <DivFieldsetStyled>
                  <LabelStyled
                     focus={focus.username}
                     htmlFor='username'
                     hasData={values.username === '' ? false : true}
                  >
                     Username
                  </LabelStyled>
                  <InputStyled
                     id='username'
                     type='text'
                     name='username'
                     value={values.username}
                     onChange={onChange}
                     onFocus={onFocus}
                     onBlur={onBlur}
                  />
               </DivFieldsetStyled>

               <DivFieldsetStyled>
                  <LabelStyled
                     htmlFor='password'
                     focus={focus.password}
                     hasData={values.password === '' ? false : true}
                  >
                     Password
                  </LabelStyled>
                  <InputStyled
                     id='password'
                     type={passwordVisible ? 'text' : 'password'}
                     name='password'
                     value={values.password}
                     onChange={onChange}
                     onFocus={onFocus}
                     onBlur={onBlur}
                  />
                  <ImgEyeStyled 
                     src={passwordVisible ? eyeVisible : eyeNotVisible}
                     alt=''
                     onClick={togglePasswordVisibilty}
                  />
               </DivFieldsetStyled>
            </form>

            {errors.map((error, i) => (
               <PRedStyled key={i}>{error}</PRedStyled>
            ))}

         </DivFlexGrowStyled>

         <DivButtonPaddingStyled>
            <ButtonSubmitStyled type='submit' form='login'>
               Login
            </ButtonSubmitStyled>
         </DivButtonPaddingStyled>
      </DivFlexStyled>
    </DivMainStyled>
   );
}

export const LinkStyled = styled(Link)`
  background: #00a816;
  border-radius: 4px;
  color: white;
  display: inline-block;
  padding: 5px 10px;
  text-align: center;
  text-decoration: none;

  &:hover {
    background: #006b0e;
    color: #adadad
  }
`

const DivMainStyled = styled.div`
   border: 1px solid black;
   border-radius: 7px;
   left: 50%;
   height: 500px;
   min-width: 300px;
   margin: 0;
   position: absolute;
   top: 50%;
   transform: translate(-50%, -75%);
   text-align: center;
   width: 500px;

   @media (max-height: 900px){
      border: none;
      margin: 0 auto;
      position: static;
      transform: translate(0, 0);
      width: 100%;
   }

   @media (max-width: 600px){
      border: none;
   }
`;

export const DivFlexStyled = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

export const DivFlexGrowStyled = styled.div`
  flex: 1 0 auto;
`

export const DivToggleFormStyled = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px;
`

export const H1TitleStyled = styled.h1`
  margin-top: 0;
`
// Thank you Chris from css tricks for giving me the css to make the "fieldset" work, ready to copy and paste
// https://css-tricks.com/snippets/css/non-form-fieldset-look/
export const DivFieldsetStyled = styled.div`
  border: 1px solid black;
  border-radius: 4px;
  box-sizing: border-box;
  margin: 10px auto;
  padding: 10px;
  position: relative;
  text-align: left;
  width: 300px;
`

// needs boolean focus prop
// needs boolean 'hasData' prop. Otherwise it will cover userinput :/
export const LabelStyled = styled.label`
  background: #fff;
  color: ${props => {
    if(!props.hasData)
        return props.focus ? 'black' : 'grey'
      return 'black'
  }};
  font-size: ${props => {
      if(!props.hasData)
        return props.focus ? '18px' : '24px'
      return '18px'
    }
  };
  line-height: 1;
  margin-top: ${props => {
      if(!props.hasData)
        return props.focus ? '-9px' : '8px'
      return '-9px'
    }
  }; /* negative margin half of fontsize, other margin trial and error ig */
  padding: 0 3px;
  position: absolute;
  top: 0;
  transition: margin-top 0.15s, font-size 0.15s, color 0.15s; // transitions from over input to part of div
`

export const InputStyled = styled.input`
  border: none;
  display: inline-block;
  font-size: 20px;
  outline: none;
  width: 250px;
`

export const DivButtonPaddingStyled = styled.div`
  padding-bottom: 10px;
`

export const ButtonSubmitStyled = styled.button`
  background: #00a816;
  border: none;
  border-radius: 4px;
  color: white;
  display: inline-block;
  flex-shrink: 0;
  padding: 5px 10px;

  &:hover {
    background: #006b0e;
    color: #adadad
  }
`
export const PRedStyled = styled.p`
  color: red;
`

export const ImgEyeStyled = styled.img`
  display: inline-block;
  height: 16px;
  margin-top: 4px;
  width: 20px;
`