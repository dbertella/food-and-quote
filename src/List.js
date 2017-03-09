import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Link,
  Redirect,
} from 'react-router-dom';
import Select from 'react-select';
import styled from 'styled-components';
import 'react-select/dist/react-select.css';

import * as actions from './actions';
import BackButton from './components/BackButton';
import Loader from './components/Loader';
import { TEXT_COLOR } from './styles';
import { BASE_URL, createMarkup } from './utils';

const TitleWrap = styled.div`
  display: flex;
  align-items: center;
`;
const Title = styled.h1`
  color: ${TEXT_COLOR};
`;

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [],
      homeTags: [],
    };
  }
  componentDidMount() {
    const { tags, requestPosts } = this.props;
    console.log('------>>>>>>', this.props)
    if (tags.length !== 0) {
      requestPosts(tags)
    }
  }

  render() {
    const {
      isFetching,
      posts,
      tags,
      goBack,
    } = this.props;

    return (
      <div className="App">
        <div className="container">
          <TitleWrap>
            <BackButton onClick={goBack} />
            <Title>{tags.map(tag => tag.label).join(', ')}</Title>
          </TitleWrap>
          {
            tags.length > 0
              ? posts.map((p, i) => (
                  <h2 key={i}>
                    <Link
                      to={`/recipe/${p.slug}`}
                      className="cards"
                      style={{ backgroundImage: `url(${p.featured_image}?w=640&h=640&crop=1)`}}
                    >
                      <span className="title" dangerouslySetInnerHTML={createMarkup(p.title)} />
                    </Link>
                  </h2>
                ))
              : <Redirect to="/" />
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return ({
    posts: state.posts.posts,
    isFetching: state.posts.isFetching,
    tags: state.tags,
  })
};

export default connect(
  mapStateToProps, {
  requestPosts: actions.requestPosts,
})(List);
