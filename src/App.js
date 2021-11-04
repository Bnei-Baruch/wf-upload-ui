import React, { Component, Fragment } from 'react';
import 'semantic-ui-css/semantic.min.css';
import MainPage from "./components/MainPage";
import './App.css';

class App extends Component {

  state = {};

  render() {
    return (
        <Fragment>
            <MainPage />
        </Fragment>
    );
  }
}

export default App;
