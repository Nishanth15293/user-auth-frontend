import React, { Component } from 'react';
// import logo from './logo.svg';
import { Route } from 'react-router-dom'
import HomePage from './Components/HomePage';
import UsersList from './Components/UsersList';
import RegisterUser from './RegisterUser';
import LoginForm from './Components/LoginForm';
import Navbar from './Components/Navbar'
import LogoutUser from './Components/LogoutUser'


import './App.css';

class App extends Component {

  updateNav = ()=> {
    this.setState({refresh: true});
  }

  render() {
    return (
      <div>

          <Route path="/" render={(history)=> (
              <Navbar history={history} />
            )}
          />
          <Route exact path="/register" render={(history)=> (
              <RegisterUser history={history}/>
            )}
          />

          <Route exact path="/" render={(history)=> (
              <LoginForm  history={history} 
              onLogin={()=>{
                  this.updateNav()
                }} />
            )}
          /> 

          <Route exact path="/home" render={(history)=> (
              <HomePage  history={history}/>
            )}
          />

          <Route exact path="/users" render={(history)=> (
              <UsersList  history={history}/>
            )}
          /> 

          <Route exact path="/logout" render={(history)=> (
              <LogoutUser  history={history} 
              onLogout={()=>{
                  history.history.push("/")
                }} />
            )}
          /> 

      </div>
    );

  }
}

export default App;
