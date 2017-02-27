import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import { createMarkup } from './utils';

class Page extends Component {
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
    } = this.props;
    console.log({isFetching})
    if (isFetching) {
      return <div>Loading...</div>
    }
    return (
      <div className="container">
        {
          post.title &&
            <div>
              <button onClick={this.props.goBack}>Back</button>
              <h2 dangerouslySetInnerHTML={createMarkup(post.title.rendered)} />
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
