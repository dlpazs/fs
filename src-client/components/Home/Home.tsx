import * as React from "react";
import { Link } from "react-router-dom";
import Counter from "../Counter";

export default class Home extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <h1>Home</h1>
        <Link to="/user">Users</Link>
        <br />
        <Link to="/posts">Posts</Link>
        <br />
        <Link to="/contributors">Contributors</Link>
        <Counter />
        <br />
      </div>
    );
  }
}
