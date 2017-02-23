import React, { Component } from 'react';
import Autocomplete from 'react-autocomplete';
import './App.css';

const BASE_URL = 'https://public-api.wordpress.com/wp/v2/sites/foodandquote.com/';
const styles = {
  item: {
    padding: '4px 6px',
    fontSize: '1.5em',
    cursor: 'default',
  },

  highlightedItem: {
    color: 'white',
    background: 'hsl(200, 50%, 50%)',
    fontSize: '1.5em',
    padding: '2px 6px',
    cursor: 'default'
  },
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      posts: [],
      value: '',
      loading: false
    };
  }
  componentDidMount() {
    fetch(BASE_URL)
      .then(r => r.json())
      .then(res => {
        console.log(res)
      });
    fetch(`${BASE_URL}tags?per_page=10`)
      .then(r => r.json())
      .then(res => {
        this.fetchPosts(res[0].id);
        this.setState({
          tags: res
        });
      });
  }
  fetchTags = (value) => {
    fetch(`${BASE_URL}tags?per_page=10&search=${value}`)
      .then(r => r.json())
      .then(res => {
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
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Autocomplete
            menuStyles={styles.menu}
            inputProps={{name: "tags", id: "tags-autocomplete"}}
            ref="autocomplete"
            value={this.state.value}
            items={this.state.tags}
            getItemValue={(item) => item.name}
            onSelect={(value, item) => {
              // set the menu to only the selected item
              this.setState({ value, tags: [ item ] })
              this.fetchPosts(item.id)
              // or you could reset it to a default list again
              // this.setState({ unitedStates: getStates() })
            }}
            onChange={(event, value) => {
              this.setState({ value, loading: true })
              this.fetchTags(value)
            }}
            renderItem={(item, isHighlighted) => (
              <div
                style={isHighlighted ? styles.highlightedItem : styles.item}
                key={item.id}
                id={item.id}
              >{item.name}</div>
            )}
          />
        </div>
        {/*{
          this.state.tags.map((t, i) => (
            <button key={i} onClick={() => this.fetchPosts(t.id)}>
              {t.slug}
            </button>
          ))
        }*/}
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
