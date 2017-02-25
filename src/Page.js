import React, { Component } from 'react';

import { BASE_URL, createMarkup } from './utils';

class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {},
    };
  }

  componentDidMount() {
    const { match } = this.props;
    fetch(`${BASE_URL}posts/${match.params.id}`)
      .then(r => r.json())
      .then(res => {
        console.log(res);
        this.setState({
          post: res,
        });
      });
  }

  render() {
    const {
      post,
    } = this.state;
    console.log('------>>>>', post)
    return (
      <div>
        {
          post.title &&
            <div>
              <button onClick={this.props.goBack}>Back</button>
              <h2 dangerouslySetInnerHTML={createMarkup(post.title.rendered)} />
              <img src={post.featured_media_url} alt={post.title.rendered} />
              <div dangerouslySetInnerHTML={createMarkup(post.content.rendered)} />
            </div>
        }
      </div>
    )
  }
}

export default Page;
