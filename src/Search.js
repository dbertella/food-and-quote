import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import styled from 'styled-components';

import * as actions from './actions';
import Logo from './components/Logo';
import Bigudi from './components/Bigudi';
import { BASE_URL, createMarkup } from './utils';
import 'react-select/dist/react-select.css';
import List from './List';

const Title = styled.h1`
  margin: 0;
  color: #fff;
  text-align: center;
  font-size: 2.9em;
`;
const SubTitle = styled.h3`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  color: #fff;
  font-family: 'Sacramento', cursive;
  font-size: 1.7em;
`;

const AppHeader = styled.div`
  background-color: #222;
  padding: 10px 20px;
`;

class Search extends Component {
  state = {
    value: [],
  }
  componentDidMount() {
    const { tags, posts, requestPosts } = this.props;
    if (!posts.length) {
      requestPosts(tags, 1);
    }
  }

  componentWillUpdate(nextProps) {
    const { tags, requestPosts } = this.props;
    if (tags.length !== nextProps.tags.length) {
      return requestPosts(nextProps.tags, 1);
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
    console.log(page, maxPages, posts.length)
    const urlParam = tags.map(tag => tag.value).join();
    return (
      <div>
        <AppHeader>
          <Title>Food and Quote</Title>
          <SubTitle>
            <Bigudi />
            3 ingredient recipes
          </SubTitle>
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
  const joinTags = state.tags.map(t => t.value).join('_');
  if (state.posts[joinTags] !== undefined) {
    return ({
      posts: state.posts[joinTags].posts,
      maxPages: state.posts[joinTags].maxPages,
      page: state.posts[joinTags].page,
      tags: state.tags,
    })
  }
  return ({
    posts: state.posts.list,
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
