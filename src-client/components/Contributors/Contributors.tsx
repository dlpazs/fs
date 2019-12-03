import * as React from "react";
import axios from "axios";
import { ContributorForm } from "../Forms/ContributorForm";
import { ContributorEdit } from "./ContributorEdit";
import { ContributorDelete } from "./ContributorDelete";
import { ContributorPost } from "./ContributorPost";

interface IUsersProps {
  _id: number;
  name: string;
}

interface IPostProps {
  _id: number;
  content: string;
  author: IUsersProps;
  contributors: Array<IContribProps>;
}

// interface IPostState {
//   posts: Array<IPostProps>;
//   users: Array<IUsersProps>;
//   loading: Boolean;
//   content: string;
//   name: string;
//   errors: string;
// }

interface IContribProps {
  _id: number;
  name: string;
  posts: Array<IPostProps>;
  content: string;
}

interface IContribState {
  posts: Array<IPostProps>;
  users: Array<IUsersProps>;
  contributors: Array<IContribProps>;
  loading: Boolean;
  content: string;
  author: string;
  errors: string;
  name: string;
}

export default class Contributors extends React.Component<
  IContribProps,
  IContribState
> {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      users: [],
      contributors: [],
      loading: true,
      content: "",
      name: "",
      author: "",
      errors: ""
    };
  }

  // fetchAllUser = () => {
  //   fetch("http://localhost:3000/users/all")
  //     .then(response => {
  //       return response.json();
  //     })
  //     .then(response => {
  //       response.forEach(element => {
  //         this.setState({
  //           users: [...this.state.users, element]
  //         });
  //         console.log(element);
  //       });
  //     })
  //     .catch(err => console.log(err));
  // };

  fetchAllPosts = () => {
    fetch("http://localhost:3000/posts/all")
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
    fetch("http://localhost:3000/contributors/all")
      .then(response => {
        return response.json();
      })
      .then(response => {
        response.forEach(element => {
          this.setState({
            contributors: [...this.state.contributors, element],
            loading: false
          });
          console.log("el", element);
        });
      })
      .catch(err => console.log(err));
    // this.fetchAllUser();
    this.fetchAllPosts();
    console.log("State", this.state);
  }

  onChange = e => {
    const { name, value } = e.target;
    console.log(this.state.content);
    this.setState({
      [name]: value
    } as any);
  };

  addContributor = () => {
    axios
      .post("http://localhost:3000/contributors", {
        content: this.state.content,
        contributor: this.state.name
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

  editContributor = id => {
    const index = this.state.contributors.findIndex(contrib => {
      return contrib._id === id;
    });
    const contributor = Object.assign({}, this.state.contributors[index]);
    const contributors = Object.assign([], this.state.contributors);
    axios
      .put("http://localhost:3000/contributors", {
        contributor: contributor.name,
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

  changeContributor = (id, e) => {
    const index = this.state.contributors.findIndex(contrib => {
      return contrib._id === id;
    });

    const contributor = Object.assign({}, this.state.contributors[index]);
    contributor.name = e.target.value;
    const contributors = Object.assign([], this.state.contributors);
    contributors[index] = contributor;
    this.setState({ contributors: contributors });
  };

  changePostContent = (id, e) => {
    const index = this.state.posts.findIndex(post => {
      return post._id === id;
    }); //GET CONTRIBUTOR

    const post = Object.assign({}, this.state.posts[index]);
    post.content = e.target.value;
    const posts = Object.assign([], this.state.posts);
    posts[index] = post;
    this.setState({ posts: posts });
  };

  onDeleteContributor = (id, e) => {
    e.preventDefault();
    const index = this.state.contributors.findIndex(contrib => {
      return contrib._id === id;
    });
    const contributors = Object.assign([], this.state.contributors);
    axios
      .delete("http://localhost:3000/contributors", {
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
    contributors.splice(index, 1);

    this.setState({ contributors: contributors });
  };

  onSubmit = e => {
    e.preventDefault();
    this.addContributor();
  };

  onSubmitEdit = (idx, e) => {
    e.preventDefault();
    this.editContributor(idx);
  };

  addPost = (id, e) => {
    const index = this.state.contributors.findIndex(contrib => {
      return contrib._id === id;
    });
    const contributor = Object.assign({}, this.state.contributors[index]); //GET CONTRIBUTOR
    e.preventDefault();
    axios
      .post("http://localhost:3000/posts", {
        content: this.state.content,
        contributor: contributor.name
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

  getPostIndex = id => {
    const index = this.state.posts.findIndex(post => {
      return post._id === id;
    });
    console.log("ID", id, this.state.posts);
    if (this.state.posts[index]) {
      return this.state.posts[index];
    }
    return false;
  };

  render() {
    const {
      loading,
      posts,
      content,
      name,
      users,
      errors,
      contributors
    } = this.state;
    return (
      <div>
        <ContributorForm
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          name={name}
          content={content}
        />
        <br />
        <span style={{ color: "red" }}>{errors}</span>
        <br />
        {!loading ? (
          contributors.map((contrib, idx) => (
            <div key={contrib._id}>
              {contrib.name}
              {contrib.posts.map(c => (
                <div key={c._id}>
                  <li>{c}</li>
                </div>
              ))}
              <ContributorPost
                onChange={this.onChange}
                onSubmit={this.addPost.bind(this, contrib._id)}
                content={contrib.content}
                idx={contrib._id}
              />

              <ContributorEdit
                onChange={this.changeContributor.bind(this, contrib._id)}
                onSubmit={this.onSubmitEdit.bind(this, contrib._id)}
                name={contrib.name}
                idx={idx}
              ></ContributorEdit>
              <br />
              <ContributorDelete
                onSubmit={this.onDeleteContributor.bind(this, contrib._id)}
                idx={contrib._id}
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
