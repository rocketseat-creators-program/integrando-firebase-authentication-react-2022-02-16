import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import * as FirebaseController from './components/firebaseController'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function onButtonSigninClicked(){
    setErrorMessage('')
    try {
      await FirebaseController.signin(email, password)
      setIsAuthenticated(true)
    } catch (error) {
      console.error(error)
      setErrorMessage(error)
    }
  }

  async function onButtonSignupClicked(){
    setErrorMessage('')
    try {
      await FirebaseController.signup(email, password)
      setIsAuthenticated(true)
    } catch (error) {
      console.error(error)
      setErrorMessage(error)
    }
  }

  async function onButtonResetPasswordClicked(){
    setErrorMessage('')
    try {
      await FirebaseController.resetPassword(email)
      alert('sended reset email password')
      console.log(email)
    } catch (error) {
      console.error(error)
      setErrorMessage(error)
    }
  }

  async function onButtonSignoutClicked(){
    setErrorMessage('')
    try {
      await FirebaseController.signout()
      setIsAuthenticated(false)
    } catch (error) {
      console.error(error)
      setErrorMessage(error)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {!isAuthenticated && (
          <div className="loginPage">
            <div className="inputs">
              <input onChange={event => setEmail(event.target.value)} placeholder="email" type="email"></input>
              <br />
              <input onChange={event => setPassword(event.target.value)} placeholder="password" type="password"></input>
            </div>
            <div className="buttons">
              <button onClick={onButtonSigninClicked} >Sign in</button>
              <br />
              <button onClick={onButtonSignupClicked} >Sign up</button>
              <br />
              <button onClick={onButtonResetPasswordClicked} >Reset password</button>
            </div>
          </div>
        )}
        {isAuthenticated && (
          <div className="authPage">
            <h3>User authenticated</h3>
            <span>User email: {email}</span>
            <br/>
            <button onClick={onButtonSignoutClicked} >Sign out</button>
          </div>
        )}
        {errorMessage && <span>{errorMessage}</span>}
      </header>
    </div>
  );
}

export default App;
