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
          title={post.title ? post.title.rendered : post.slug}
          meta={[
              {name: "description", content: "3 ingredient recipes and parenting quotes"},
              {property: "og:type", content: "article"}
          ]}
          link={[
              {rel: "canonical", href: post.link},
          ]}
      />
        {
          post.title &&
            <div>
              <TitleWrap>
                <BackButton onClick={goBack} />
                <Title dangerouslySetInnerHTML={createMarkup(post.title.rendered)} />
              </TitleWrap>
              <img src={`${post.featured_media_url}?w=640&h=360&crop=1`} alt={post.title.rendered} />
              <div dangerouslySetInnerHTML={createMarkup(post.content.rendered)} />
            </div>
        }
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
