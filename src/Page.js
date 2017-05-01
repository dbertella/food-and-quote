// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from "react-helmet";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Overdrive from 'react-overdrive';
import {
  ShareButtons,
  generateShareIcon,
} from 'react-share';

import BackButton from './components/BackButton';
import Container from './components/Container';
import Loader from './components/Loader';
import ShareIcon from './components/ShareIcon';
import * as actions from './actions';
import { createMarkup } from './utils';
import { TEXT_COLOR } from './styles';
import type { Post } from './types';
import Logo from './components/Logo';

const {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  PinterestShareButton,
} = ShareButtons;

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
const WhatsappIcon = generateShareIcon('whatsapp');
const PinterestIcon = generateShareIcon('pinterest');

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
const Footer = styled.div`
  background: #e7e7e7;
  padding: 2em 1em;
  margin: 1em -1em 0;
`;
const Separator = styled.div`
  height: 1px;
  background: #e3e3e3;
  margin: 0.5em 0;
`;
const Flex = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-family: 'Sacramento', cursive;
  > div {
    margin-left: 1em;
  }
`;
const ShareLink = styled.a`
  margin-left: auto;
  margin-right: 1em;
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
  state = {
    showHeaderShare: false
  }
  componentDidMount() {
    const { match, post, requestPostById } = this.props;
    if (!post.title) {
      requestPostById(match.params.id);
    }
    window.scrollTo(0, 0)
  }

  toggleHeaderShare = () => {
    this.setState({
      showHeaderShare: !this.state.showHeaderShare,
    })
  }
  socialShare = (showDescription) => {
    const { post } = this.props;
    return (
      <Flex>
        {showDescription && 'Share this recipe'}
        <FacebookShareButton url={post.URL} title={post.title}><FacebookIcon size={32} round={true} /></FacebookShareButton>
        <TwitterShareButton url={post.URL} title={post.title}><TwitterIcon size={32} round={true} /></TwitterShareButton>
        <WhatsappShareButton url={post.URL} title={post.title}><WhatsappIcon size={32} round={true} /></WhatsappShareButton>
        <PinterestShareButton url={post.URL} media={post.featured_image}><PinterestIcon size={32} round={true} /></PinterestShareButton>
      </Flex>
    )
  };
  render() {
    const {
      post,
      isFetching,
      history,
    } = this.props;

    const width = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;
    const tags = Object.keys(post.tags || {})
    const postTags = tags.map((key, i) => (
      <span key={i}>
        {i !== 0 && ', '}
        <Link to={`/t/${post.tags[key].slug}`}>{post.tags[key].name}</Link>
      </span>
    ));
    const categories = Object.keys(post.categories || {})
    const postCategories = categories.map((key, i) => (
      <span key={i}>
        {i !== 0 && ', '}
        <Link to={`/c/${post.categories[key].slug}`}>{post.categories[key].name}</Link>
      </span>
    ));

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
          <ShareLink onClick={this.toggleHeaderShare}>
            
            {
              this.state.showHeaderShare
                ? this.socialShare(false)
                : <ShareIcon />
            }
          </ShareLink>
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
          {this.socialShare(true)}
          <Footer>
            <div>
              {
                postCategories
              }
            </div>
            <Separator />
            <div>
              {
                postTags
              }
            </div>
            <Separator />
            Visit <a href="https://foodandquote.com/" target="_blank">foodandquote.com</a> for more
          </Footer>
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
