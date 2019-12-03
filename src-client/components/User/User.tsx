import * as React from "react";
import { Link } from "react-router-dom";
import { UserForm } from "../Forms/UserForm";
import axios from "axios";
import { UserEdit } from "./UserEdit";
import { UserDelete } from "./UserDelete";
import { UserPost } from "./UserPost";

interface IContribProps {
  _id: number;
  name: string;
  posts: Array<IPostProps>;
  content: string;
}

interface IPostProps {
  _id: number;
  content: string;
  author: IUsersProps;
  contributors: Array<IContribProps>;
  contributor: string;
}

interface IUsersProps {
  _id: number;
  name: string;
  posts: Array<IPostProps>;
  content: string;
}

interface IUserState {
  users: Array<IUsersProps>;
  loading: Boolean;
  name: string;
  posts: Array<IPostProps>;
  content: string;
}

export default class User extends React.Component<IUsersProps, IUserState> {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loading: true,
      name: "",
      posts: [],
      content: ""
    };
  }

  fetchAllPosts = () => {
    fetch("/posts/all")
      .then(response => {
        return response.json();
      })
      .then(response => {
        response.forEach(element => {
          this.setState({
            posts: [...this.state.posts, element]
          });
          console.log("POSTS", element);
        });
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    fetch("/users/all")
      .then(response => {
        return response.json();
      })
      .then(response => {
        response.forEach(element => {
          this.setState({
            users: [...this.state.users, element],
            loading: false
          });
        });
      })
      .catch(err => console.log(err));
    this.fetchAllPosts();
  }

  onChange = e => {
    const { name, value } = e.target;
    console.log(this.state);
    this.setState({
      [name]: value
    } as any);
  };

  addUser = () => {
    axios
      .post("/users", {
        name: this.state.name
      })
      .then(response => {
        this.setState({
          users: [...this.state.users, response.data]
        });
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  editUser = idx => {
    const index = this.state.users.findIndex(user => {
      return user._id === idx;
    });
    const user = Object.assign({}, this.state.users[index]);
    const users = Object.assign([], this.state.users);
    axios
      .put("/users", {
        name: user.name,
        id: idx
      })
      .then(response => {
        users[index] = user;
        this.setState({
          users: users
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  changeUserName = (id, e) => {
    const index = this.state.users.findIndex(user => {
      return user._id === id;
    });

    const user = Object.assign({}, this.state.users[index]);
    user.name = e.target.value;
    const users = Object.assign([], this.state.users);
    users[index] = user;
    this.setState({ users: users });
  };

  onDeleteUser = (id, e) => {
    e.preventDefault();
    const index = this.state.users.findIndex(user => {
      return user._id === id;
    });
    const users = Object.assign([], this.state.users);
    const user = Object.assign({}, this.state.users[index]);
    axios
      .delete("/users", {
        data: {
          name: user.name
        }
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
    users.splice(index, 1);

    this.setState({ users: users });
  };

  onSubmit = e => {
    e.preventDefault();
    this.addUser();
  };

  onSubmitEdit = (idx, e) => {
    e.preventDefault();
    this.editUser(idx);
  };

  addPost = (id, e) => {
    const index = this.state.users.findIndex(user => {
      return user._id === id;
    });
    const user = Object.assign({}, this.state.users[index]); //GET CONTRIBUTOR
    e.preventDefault();
    axios
      .post("/posts", {
        content: this.state.content,
        author: user.name
      })
      .then(response => {
        this.setState({
          posts: [...this.state.posts, response.data]
        });
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { loading, users, name, posts } = this.state;
    return (
      <div>
        <UserForm
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          name={name}
        />
        <br />
        {!loading ? (
          users.map((user, idx) => (
            <div key={user._id}>
              {user.posts.map(post => (
                <div key={post._id}>
                  <li>{post}</li>
                </div>
              ))}

              <UserPost
                onChange={this.onChange}
                onSubmit={this.addPost.bind(this, user._id)}
                content={user.content}
                idx={user._id}
                name={user.name}
              />

              <UserEdit
                onChange={this.changeUserName.bind(this, user._id)}
                onSubmit={this.onSubmitEdit.bind(this, user._id)}
                name={user.name}
                idx={idx}
              >
                {user.name}
              </UserEdit>
              <br />
              <UserDelete
                onSubmit={this.onDeleteUser.bind(this, user._id)}
                idx={user._id}
              />
            </div>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
    );
  }
}
