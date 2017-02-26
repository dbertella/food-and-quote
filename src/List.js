import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Link,
} from 'react-router-dom';
import Select from 'react-select';
import { intersection } from 'lodash';
import * as actions from './actions';

import { BASE_URL, createMarkup } from './utils';
import 'react-select/dist/react-select.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [],
      posts: [],
    };
  }
  componentDidMount() {
    const posts = localStorage.getItem('posts');
    const value = localStorage.getItem('value');
    if (posts) {
      this.setState({
        posts: JSON.parse(posts),
        value: JSON.parse(value),
      })
    }
  }
  componentWillUpdate(nextProps, nextState) {
    const { value } = nextState;
    const { requestPosts } = this.props;
    if (value.length > 0 && value.length !== this.state.value.length) {
      requestPosts(value);
    }
  }

  onChange = (value) => {
		this.setState({
			value: value,
		});
    localStorage.setItem('value', JSON.stringify(value));
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
        const sorted = this.sortPosts(res);
        this.setState({
          posts: sorted,
        });
        localStorage.setItem('posts', JSON.stringify(sorted));
      });
  };
  
  render() {
    const {
      value,
    } = this.state;
    const {
      posts
    } = this.props;
    console.log(posts)
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

const mapStateToProps = (state, ownProps) => {
  return ({
    posts: state.posts.posts,
    isFetching: state.post.isFetching,
  })
};

export default connect(
  mapStateToProps, {
  requestPosts: actions.requestPosts,
})(App);
