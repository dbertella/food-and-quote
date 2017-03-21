import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import styled from 'styled-components';

import * as actions from './actions';
import Logo from './components/Logo';
import { BASE_URL, createMarkup } from './utils';
import 'react-select/dist/react-select.css';
import List from './List';

const Title = styled.h1`
  margin: 0;
  color: #fff;
  padding: 0 20px;
`;
const AppHeader = styled.div`
  display: flex;
  alignItems: center;
  background-color: #222;
  padding: 10px 20px;
`;

class Search extends Component {
  state = {
    value: [],
  }
  componentDidMount() {
    const { tags, page, posts, requestPosts } = this.props;
    if (!posts.length) {
      requestPosts(tags, page);
    }
  }

  componentWillUpdate(nextProps) {
    const { tags, requestPosts, page } = this.props;
    if (tags.length !== nextProps.tags.length) {
      return requestPosts(nextProps.tags, nextProps.page);
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
      isFetching,
      posts,
      page,
      maxPages,
      tags,
    } = this.props;
    const urlParam = tags.map(tag => tag.value).join();
    return (
      <div>
        <AppHeader>
          <Logo />
          <Title>Food and Quote</Title>
        </AppHeader>
        <Select.Async
          multi
          value={tags}
          name="form-field-name"
          placeholder={'Egg, courgette, potato...'}
          loadOptions={this.fetchTags}
          onChange={this.onChange}
          onValueClick={this.gotoUser}
        />
        {
          posts.length > 0 &&
            <List posts={posts} page={page} maxPages={maxPages} loadMore={this.loadMore} />
        }
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return ({
    posts: state.posts[state.tags.map(t => t.value).join('_')] || state.posts.list,
    maxPages: state.posts.maxPages,
    page: state.posts.page,
    tags: state.tags,
  })
};

export default connect(
  mapStateToProps, {
  requestPosts: actions.requestPosts,
  handleTags: actions.handleTags,
})(Search);
