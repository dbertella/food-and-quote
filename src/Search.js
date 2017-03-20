import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Link,
} from 'react-router-dom';
import Select from 'react-select';
import styled from 'styled-components';

import * as actions from './actions';
import Loader from './components/Loader';
import { BASE_URL, createMarkup } from './utils';
import 'react-select/dist/react-select.css';
import List from './List';

const InitialTag = styled.button`
  font-size: 1.2em;
  line-height: 1.4;
  background-color: #373737;
  border-radius: 2px;
  border: 1px solid #373737;
  color: #fff;
  cursor: pointer;
  margin: 15px;
`;
const TagWrap = styled.div`
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
  margin-top: 15px;
`
const HungryButton = styled(Link)`
  font-size: 2em;
  line-height: 1.4;
  background-color: #373737;
  border-radius: 3px;
  color: #fff;
  text-decoration: none;
  cursor: pointer;
  margin: 15px;
  padding: 0.5em 1.5em;
`;

class App extends Component {
  state = {
    value: [],
  }
  componentDidMount() {
    const { tags, requestPosts } = this.props;
    requestPosts(tags)
  }

  componentWillUpdate(nextProps) {
    const { tags } = nextProps;
    const { requestPosts } = this.props;
    if (tags.length !== this.props.tags.length) {
      return requestPosts(tags);
    }
  }

  onChange = (value) => this.props.handleTags(value);

  setValue = (value) => this.props.handleTags([value]);

  loadMore = (page) => {
    const { tags, requestPosts } = this.props;
    requestPosts(tags, page)
  };

  fetchTags = (input) => {
    if (!input) {
			return Promise.resolve({ options: [] });
		}
    return fetch(`${BASE_URL}tags?fields=name%2C%20slug&number=50&search=${input}`)
      .then(r => r.json())
      .then(res => {
        const options = res.tags.map(tag => ({
          value: tag.slug,
          label: tag.name
        }))
        return {
          options
        };
      });
  };
  render() {
    const {
      homeTags,
    } = this.state;
    const {
      isFetching,
      posts,
      count,
      tags,
    } = this.props;
    const urlParam = tags.map(tag => tag.value).join();
    return (
      <div>
        {/*<Select.Async
          multi
          value={tags}
          name="form-field-name"
          placeholder={'Egg, courgette, potato...'}
          loadOptions={this.fetchTags}
          onChange={this.onChange}
          onValueClick={this.gotoUser}
        />*/}
        {
          count > 0 &&
            <List posts={posts} count={count} loadMore={this.loadMore} />
        }
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return ({
    posts: state.posts.posts,
    count: state.posts.count,
    tags: state.tags,
  })
};

export default connect(
  mapStateToProps, {
  requestPosts: actions.requestPosts,
  handleTags: actions.handleTags,
})(App);
