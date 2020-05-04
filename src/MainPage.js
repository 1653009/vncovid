import React, { Component } from 'react'
import App from "./App"
import Header from "./component/Header"
import Chart from "./component/Chart"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
class MainPage extends Component {
  render() {
    return (
    <Router>
      <div>
      <Header />
        <Switch>
          <Route path="/map">
            <App />
          </Route>
          <Route path="/stats">
            <Chart />
          </Route>
          <Route path="/">
                      </Route>
        </Switch>
      </div>
      </Router>
    )
  }
}
export default MainPage;