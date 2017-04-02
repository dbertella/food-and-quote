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
const FullScreenImg = styled.img`
  width: 100%;
  height: auto;
`;
const MaxHeight = styled.div`
  @media (min-width: 640px) {
    max-height: 500px;
    overflow: hidden;
  }
`;
class Page extends Component {
  props: {
    post: Post,
    match: Object,
    requestPostById: Function,
    isFetching: boolean,
    history: Object,
    location: Object,
  }

  componentDidMount() {
    const { match, post, requestPostById } = this.props;
    if (!post.title) {
      requestPostById(match.params.id);
    }
    window.scrollTo(0, 0)
  }

  render() {
    const {
      post,
      isFetching,
      history,
    } = this.props;
    const width = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;
    return (
      <div>
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
        <MaxHeight>
          {
            post.featured_image &&
            <FullScreenImg src={`${post.featured_image}?w=${Math.ceil(width)}&crop=1`} alt={post.title} />
          }
        </MaxHeight>
        <Container>
          <Title dangerouslySetInnerHTML={createMarkup(post.title)} />
          <div dangerouslySetInnerHTML={createMarkup(post.content)} />
        </Container>
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
