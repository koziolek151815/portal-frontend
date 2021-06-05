import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import RegistrationForm from "./Components/RegistrationForm/RegistrationForm";
import LoginForm from "./Components/LoginForm/LoginForm";
import AlertComponent from "./Components/AlertComponent/AlertComponent";

import {useState} from "react";
import Chat from "./Components/Chat/Chat";
import Header from "./Components/Header/Header";

function App() {
  const [errorMessage, updateErrorMessage] = useState(null);

  return (
      <Router>
        <div className="App">
          <Header/>

          <Switch>
            <Route path="/" exact={true}>
              <RegistrationForm showError={updateErrorMessage}/>
            </Route>
            <Route path="/register">
              <RegistrationForm showError={updateErrorMessage}/>
            </Route>
            <Route path="/login">
              <LoginForm showError={updateErrorMessage}/>
            </Route>
            <Route path="/chat">
              <Chat showError={updateErrorMessage}/>
            </Route>
          </Switch>
          <AlertComponent errorMessage={errorMessage} hideError={updateErrorMessage}/>
        </div>
      </Router>
  );
}

export default App;
