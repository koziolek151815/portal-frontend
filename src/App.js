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

function App() {
  const [errorMessage, updateErrorMessage] = useState(null);

  return (
      <Router>
        <div className="App">
          <header>

          </header>

          <div className="container d-flex flex-column pb-5">
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
        </div>
      </Router>
  );
}

export default App;
