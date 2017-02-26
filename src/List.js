import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Link,
} from 'react-router-dom';
import Select from 'react-select';
import * as actions from './actions';

import { BASE_URL, createMarkup } from './utils';
import 'react-select/dist/react-select.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [],
    };
  }
  componentDidMount() {
    const value = localStorage.getItem('value');
    if (value) {
      this.setState({
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
                      style={{ backgroundImage: `url(${p.featured_media_url}?w=640&h=640&crop=1)`}}
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
