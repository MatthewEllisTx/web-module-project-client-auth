import { createContext, useState } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import LoginPage from './components/LoginPage'
import Friends from './components/Friends'

export const Context = createContext();

const noUser = {
  username: null,
  token: null,
}

function App(){
  const [ user, setUser ] = useState(noUser)

  const providerValues = {
    user,
    setUser
  }
  return (
    <Context.Provider value={providerValues}>
      {/* When not signed in redirect to login */}
      {(!user.token) && <Redirect to='/login' />}
      <Switch>
        <Route path='/login' component={LoginPage} />
          {/* <LoginPage /> */}
        {/* </Route> */}
        <Route path='/friends' component={Friends} />
        
      </Switch>
    </Context.Provider>
  );
}

export default App;
