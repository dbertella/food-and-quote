// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from "react-helmet";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Overdrive from 'react-overdrive';

import BackButton from './components/BackButton';
import Container from './components/Container';
import Loader from './components/Loader';
import * as actions from './actions';
import { createMarkup } from './utils';
import { TEXT_COLOR } from './styles';
import type { Post } from './types';
import Logo from './components/Logo';

export const Title = styled.h1`
  color: ${TEXT_COLOR};
  font-size: 17px;
  text-align: center;
  marginTop: 30px;
`;
const AppHeader = styled.div`
  display: flex;
  alignItems: center;
  padding: 10px 0;
  background-color: #222;
`;
class Page extends Component {
  props: {
    post: Post,
    match: Object,
    requestPostById: Function,
    isFetching: boolean,
    history: Object,
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
      history,
    } = this.props;
    if (!post.featured_image) {
      return <Loader />
    }
    return (
      <Container>
        <Helmet
          title={post.title}
          meta={[
              {property: "og:type", content: "article"}
          ]}
          link={[
              {rel: "canonical", href: post.URL},
          ]}
        />
        <AppHeader>
          <BackButton onClick={history.goBack} />
          <Link to="/"><Logo /></Link>
        </AppHeader>
        <Overdrive id={post.slug}>
          {
            post.featured_image &&
            <img src={`${post.featured_image}?w=640&h=360&crop=1`} alt={post.title} />
          }
          <Title dangerouslySetInnerHTML={createMarkup(post.title)} />
        </Overdrive>
        <div dangerouslySetInnerHTML={createMarkup(post.content)} />
      </Container>
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
