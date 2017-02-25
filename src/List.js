import React, { Component } from 'react';
import {
  Link,
} from 'react-router-dom';
import Select from 'react-select';
import { intersection } from 'lodash';
import 'react-select/dist/react-select.css';

import { BASE_URL, createMarkup } from './utils';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      value: [],
    };
  }

  componentWillUpdate(nextProps, nextState) {
    const { value } = nextState;
    if (value.length > 0 && value.length !== this.state.value.length) {
      this.fetchPosts(encodeURIComponent(value.map(tag => tag.value).join()));
    }
  }

  onChange = (value) => {
		this.setState({
			value: value,
		});
	};

  fetchTags = (input) => {
    if (!input) {
			return Promise.resolve({ options: [] });
		}
    return fetch(`${BASE_URL}tags?per_page=100&search=${input}`)
      .then(r => r.json())
      .then(res => {
        const options = res.map(tag => ({
          value: tag.id.toString(),
          label: tag.name
        }))
        return {
          options
        };
      });
  };

  sortPosts = (posts) => {
    const { value } = this.state;
    return posts.slice().sort((a, b) => {
      var tagALength = intersection(
        a.tags.map(el => el.toString()),
        value.map(el => el.value)).length;
      var tagBLength = intersection(
        b.tags.map(el => el.toString()),
        value.map(el => el.value)).length;
      if (tagALength > tagBLength) {
        return -1;
      }
      if (tagALength < tagBLength) {
        return 1;
      }
      return 0;
    });
  }

  fetchPosts = (tags) => {
    fetch(`${BASE_URL}posts?per_page=100&tags=${tags}`)
      .then(r => r.json())
      .then(res => {
        console.log(res)
        this.setState({
          posts: this.sortPosts(res)
        });
      });
  };
  
  render() {
    const {
      value,
      posts,
    } = this.state;
    return (
      <div className="App">
        <Select.Async
          multi
          value={value}
          name="form-field-name"
          loadOptions={this.fetchTags}
          onChange={this.onChange}
          onValueClick={this.gotoUser}
        />
        <div className="container">
          {
            posts.length > 0 
              ? posts.map((p, i) => (
                  <h2 key={i}>
                    <Link
                      to={`/${p.id}`}
                      className="cards"
                      style={{ backgroundImage: `url(${p.featured_media_url})`}}
                    >
                      <span className="title" dangerouslySetInnerHTML={createMarkup(p.title.rendered)} />
                    </Link>
                  </h2>
                ))
              : <div className="pad-1">
                  What's left in your kitchen?
                </div>
            
          }
        </div>
      </div>
    );
  }
}

export default App;
