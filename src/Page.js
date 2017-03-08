// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from "react-helmet";
import styled from "styled-components";

import BackButton from './components/BackButton';
import Loader from './components/Loader';
import * as actions from './actions';
import { createMarkup } from './utils';
import { TEXT_COLOR } from './styles';
import type { Post } from './types';

const TitleWrap = styled.div`
  display: flex;
  align-items: center;
`;
const Title = styled.h1`
  color: ${TEXT_COLOR};
`;

class Page extends Component {
  props: {
    post: Post,
    match: Object,
    requestPostById: Function,
    isFetching: boolean,
    goBack: Function,
  }
  componentDidMount() {
    const { match, post, requestPostById } = this.props;
    if (!post.title) {
      requestPostById(match.params.id);
    }
  }

  render() {
    const {
      post,
      isFetching,
      goBack,
    } = this.props;
    if (isFetching) {
      return <Loader />
    }
    return (
      <div className="container">
        <Helmet
          title={post.title}
          meta={[
              {property: "og:type", content: "article"}
          ]}
          link={[
              {rel: "canonical", href: post.URL},
          ]}
      />
      <TitleWrap>
        <BackButton onClick={goBack} />
        <Title dangerouslySetInnerHTML={createMarkup(post.title)} />
      </TitleWrap>
      {
        post.featured_image &&
        <img src={`${post.featured_image}?w=640&h=360&crop=1`} alt={post.title} />
      }
      <div dangerouslySetInnerHTML={createMarkup(post.content)} />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const post = {
    ...state.post[ownProps.match.params.id]
  };
  return ({
    post,
    isFetching: state.post.isFetching,
  })
};

export default connect(
  mapStateToProps, {
  requestPostById: actions.requestPostById,
})(Page);
