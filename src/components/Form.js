import { Component } from "react";
// import ReactDOM from "react-dom";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = { form: {}, id: 101 };
    this.onChange = this.onChange.bind(this);
    this.insert = this.insert.bind(this);
  }

  onChange(e) {
    this.setState({
      form: { ...this.state.form, [e.target.name]: e.target.value },
    });
  }

  insert(e) {
    e.preventDefault();
    if (this.state.form.title.length < 1) return alert(`Hai`);
    if (this.state.form.body.length < 1) return alert(`My body`);
    const data = {
      title: this.state.form.title,
      body: this.state.form.body,
      userId: 1,
    };
    fetch(this.props.url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((post) => {
        post.id = this.state.id;
        this.setState({ id: this.state.id + 1 });
        this.props.addPost(post);
      });
  }

  render() {
    console.log(this.state);
    return (
      <div style={{ margin: 40 }}>
        <form onSubmit={this.insert}>
          <label htmlFor="title" style={{ marginLeft: 3 }}>
            Title
          </label>
          <input type="text" name="title" id="title" onChange={this.onChange} />
          <label htmlFor="body" style={{ marginLeft: 3 }}>
            Body
          </label>
          <input type="text" name="body" id="body" onChange={this.onChange} />
          <input type="submit" value="Add" />
        </form>
      </div>
    );
  }
}

export default Form;
