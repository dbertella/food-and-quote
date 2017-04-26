// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from "react-router-dom";

import * as actions from '../actions';

import BackButton from '../components/BackButton';
import Logo from '../components/Logo';
import { BASE_URL, createMarkup } from '../utils';
import List from '../List';

const AppHeader = styled.div`
  display: flex;
  alignItems: center;
  padding: 10px 0;
  background-color: #222;
`;

class Search extends Component {
  componentDidMount() {
    const { match, requestPosts } = this.props;
    window.scrollTo(0, 0);
    requestPosts(match.params.category, 1);
  }

  loadMore = (page) => {
    const { match, requestMorePosts } = this.props;
    requestMorePosts(match.params.category, page)
  };

  render() {
    const {
      isFetching,
      posts,
      page,
      maxPages,
      history,
    } = this.props;
    return (
      <div>
        <AppHeader>
          <BackButton onClick={history.goBack} />
          <Link to="/"><Logo /></Link>
        </AppHeader>
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
    posts: state.posts.list,
    maxPages: state.posts.maxPages,
    page: state.posts.page,
    tags: state.tags,
  })
};

export default connect(
  mapStateToProps, {
  requestPosts: actions.requestPostsByCategory,
  requestMorePosts: actions.requestMorePostsByCategory,
  handleTags: actions.handleTags,
})(Search);
