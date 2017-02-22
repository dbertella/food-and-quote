import React, { Component } from 'react';
import './App.css';

const BASE_URL = 'https://public-api.wordpress.com/wp/v2/sites/foodandquote.com/';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      posts: [],
    };
  }
  componentDidMount() {
    fetch(BASE_URL)
      .then(r => r.json())
      .then(res => {
        console.log(res)
      });
    fetch(`${BASE_URL}tags?per_page=100`)
      .then(r => r.json())
      .then(res => {
        this.fetchPosts(res[0].id);
        this.setState({
          tags: res
        });
      });
  }
  fetchPosts = (tagId) => {
    fetch(`${BASE_URL}posts?per_page=10&tags=${tagId}`)
      .then(r => r.json())
      .then(res => {
        console.log(res);
        this.setState({
          posts: res
        });
      });
  }
  createMarkup = (html) => ({
    __html: html
  })
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Food and Quote</h1>
        </div>
        {
          this.state.tags.map((t, i) => (
            <button key={i} onClick={() => this.fetchPosts(t.id)}>
              {t.slug}
            </button>
          ))
        }
        <div className="container">
          {
            this.state.posts.map((p, i) => (
              <div key={i}>
                <h2 dangerouslySetInnerHTML={this.createMarkup(p.title.rendered)} />
                <img src={p.featured_media_url} />
                <div dangerouslySetInnerHTML={this.createMarkup(p.content.rendered)} />
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

export default App;
