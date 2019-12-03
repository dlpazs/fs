import * as React from "react";
import axios from "axios";
import { PostForm } from "../Forms/PostForm";
import { PostEdit } from "./PostEdit";
import { PostDelete } from "./PostDelete";
import { PostContributor } from "./PostContributor";

interface IUsersProps {
  _id: number;
  name: string;
}

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

interface IPostState {
  posts: Array<IPostProps>;
  users: Array<IUsersProps>;
  contributors: Array<IContribProps>;
  loading: Boolean;
  content: string;
  name: string;
  errors: string;
  contributor: string;
}

export default class Posts extends React.Component<IPostProps, IPostState> {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      users: [],
      contributors: [],
      loading: true,
      content: "",
      name: "",
      errors: "",
      contributor: ""
    };
  }

  fetchAllContributors = () => {
    fetch("http://localhost:5001/contributors/all")
      .then(response => {
        return response.json();
      })
      .then(response => {
        response.forEach(element => {
          this.setState({
            contributors: [...this.state.contributors, element]
          });
          console.log("el", element);
        });
      })
      .catch(err => console.log(err));
    console.log("State", this.state);
  };

  componentDidMount() {
    fetch("http://localhost:5001/posts/all")
      .then(response => {
        return response.json();
      })
      .then(response => {
        response.forEach(element => {
          this.setState({
            posts: [...this.state.posts, element],
            loading: false
          });
        });
      })
      .catch(err => console.log(err));
    this.fetchAllContributors();
    console.log(this.state);
  }

  onChange = e => {
    const { name, value } = e.target;
    console.log(this.state);
    this.setState({
      [name]: value
    } as any);
  };

  addPost = () => {
    axios
      .post("http://localhost:5001/posts", {
        content: this.state.content,
        author: this.state.name
      })
      .then(response => {
        this.setState({
          posts: [...this.state.posts, response.data]
        });
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
        this.setState({
          errors: err
        });
      });
  };

  editPost = id => {
    const index = this.state.posts.findIndex(post => {
      return post._id === id;
    });
    const post = Object.assign({}, this.state.posts[index]);
    const posts = Object.assign([], this.state.posts);
    axios
      .put("http://localhost:5001/posts", {
        content: post.content,
        id: id
      })
      .then(response => {
        console.log(response.data);
        this.setState({ errors: response.data.message });
      })
      .catch(err => {
        console.log(err);
      });
  };

  changePostContent = (id, e) => {
    const index = this.state.posts.findIndex(post => {
      return post._id === id;
    });

    const post = Object.assign({}, this.state.posts[index]);
    post.content = e.target.value;
    const posts = Object.assign([], this.state.posts);
    posts[index] = post;
    this.setState({ posts: posts });
  };

  onDeletePost = (id, e) => {
    e.preventDefault();
    const index = this.state.posts.findIndex(post => {
      return post._id === id;
    });
    const posts = Object.assign([], this.state.posts);
    axios
      .delete("http://localhost:5001/posts", {
        data: {
          id: id
        }
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
    posts.splice(index, 1);

    this.setState({ posts: posts });
  };

  onSubmit = e => {
    e.preventDefault();
    this.addPost();
  };

  addContributor = (id, e) => {
    const index = this.state.posts.findIndex(post => {
      return post._id === id;
    });
    const post = Object.assign({}, this.state.posts[index]); //GET CONTRIBUTOR
    e.preventDefault();
    console.log("HIZZ", post, this.state.contributors, post.contributor);
    axios
      .post("http://localhost:5001/contributors", {
        content: post.content,
        contributor: this.state.contributor
      })
      .then(response => {
        this.setState({
          contributors: [...this.state.contributors, response.data]
        });
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  onSubmitEdit = (idx, e) => {
    e.preventDefault();
    this.editPost(idx);
  };

  render() {
    const {
      loading,
      posts,
      content,
      name,
      users,
      errors,
      contributor
    } = this.state;
    return (
      <div>
        <PostForm
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          name={name}
          content={content}
        />
        <br />
        <span style={{ color: "red" }}>{errors}</span>
        <br />
        {!loading ? (
          posts.map((post, idx) => (
            <div key={post._id}>
              {post.content}
              {post.contributors.map(p => (
                <div key={p._id}>
                  <li>{p}</li>
                </div>
              ))}
              <PostContributor
                onChange={this.onChange}
                onSubmit={this.addContributor.bind(this, post._id)}
                content={post.content}
                idx={post._id}
                name={post.contributor}
              />

              <PostEdit
                onChange={this.changePostContent.bind(this, post._id)}
                onSubmit={this.onSubmitEdit.bind(this, post._id)}
                content={post.content}
                idx={idx}
              ></PostEdit>
              <br />
              <PostDelete
                onSubmit={this.onDeletePost.bind(this, post._id)}
                idx={post._id}
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
