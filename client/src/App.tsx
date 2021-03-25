import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";

import Login from "./scopes/Login/Login";

import "./App.css";
import { AppProvider, useAppContext } from "./contexts/AppContext";
import TokenHandler from "./scopes/TokenHandler/TokenHandler";
import Scores from "./scopes/Scores/Scores";

// The famous nullable boolean we inherited from Java
type nullableBoolean = boolean | null;

function App() {
  const [connected, setConnected] = useState<nullableBoolean>(null);
  const { token, setToken } = useAppContext();

  useEffect(() => {
    const tokenStorage = localStorage.getItem('token');
    console.log('tokenStorage: ', tokenStorage)
      setToken(tokenStorage);

    fetch("http://localhost:4000")
      .then(() => setConnected(true))
      .catch(() => setConnected(false));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
      <h1>Scoring machine</h1>
      </header>
      <Router>
        <Switch>
          <Route path="/login" component={Login}></Route>
          {token && (
            <>
              <Route path="/scores" component={Scores}></Route>
            </>
          )}
          <Route path="*" exact>
            <h1>
              API:
              {connected === true && " connected"}
              {connected === false && " not connected"}
            </h1>
            <Link className="login" to="/login">
              Login
            </Link>
          </Route>
        </Switch>
        <Route path="*" component={TokenHandler}></Route>
      </Router>
    </div>
  );
}
const WrappedApp = () => (
  <AppProvider>
    <App />
  </AppProvider>
);

export default WrappedApp;
