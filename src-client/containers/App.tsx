import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home/Home";
import User from "../components/User/User";
import Posts from "../components/Posts/Posts";
import Contributors from "../components/Contributors/Contributors";
import store from "../store/";
import { Provider } from "react-redux";

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/user" component={User} />
            <Route path="/posts" component={Posts} />
            <Route path="/contributors" component={Contributors} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}
