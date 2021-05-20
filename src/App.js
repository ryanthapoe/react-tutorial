import { Component } from "react";
import Form from "./components/Form";
import "./App.css";

// Class component
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      url: "https://jsonplaceholder.typicode.com/posts",
      reverse: false,
    };
    this.reverse = this.reverse.bind(this);
    this.addPost = this.addPost.bind(this);
  }

  getData() {
    fetch(this.state.url)
      .then((res) => res.json())
      .then((posts) => this.setState({ posts }));
  }

  componentDidMount() {
    this.getData();
  }

  // componentDidUpdate() {
  //   console.log("Updated");
  // }

  reverse() {
    const data = [];
    for (let i = this.state.posts.length - 1; i >= 0; i--) {
      data.push(this.state.posts[i]);
    }
    this.setState({ posts: data, reverse: !this.state.reverse });
  }

  addPost(post) {
    let data;
    if (!this.state.reverse) {
      data = [...this.state.posts, post];
    } else {
      data = [post, ...this.state.posts];
    }
    this.setState({ posts: data });
  }

  render() {
    const postData = this.state.posts;
    return (
      <div style={{ margin: 50 }}>
        <button onClick={() => this.reverse()}>Reverse</button>
        <Form url={this.state.url} addPost={this.addPost} />
        {postData.map((post, i) => {
          return (
            <div key={i} style={{ marginBottom: 10 }}>
              <h1>
                {post.id}. Title : {post.title}
              </h1>
              <p>Body : {post.body}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

// function App() {
//   return (
//     <div className="App">
//       <h1>Hellow WOrld</h1>
//     </div>
//   );
// }

export default App;
