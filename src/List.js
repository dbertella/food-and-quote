import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Link,
} from 'react-router-dom';
import Select from 'react-select';
import styled from 'styled-components';
import * as actions from './actions';

import Loader from './components/Loader';
import { BASE_URL, createMarkup } from './utils';
import 'react-select/dist/react-select.css';

const InitialTag = styled.button`
  font-size: 1.2em;
  line-height: 1.4;
  background-color: #373737;
  border-radius: 2px;
  border: 1px solid #373737;
  color: #fff;
  cursor: pointer;
  margin: 15px;
`;
const TagWrap = styled.div`
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
  margin-top: 15px;
`

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [],
      homeTags: [],
    };
  }
  componentDidMount() {
    const { tags } = this.props;
    if (tags.length === 0) {
      this.fetchFirstTenTags();
    }
  }

  componentWillUpdate(nextProps) {
    const { tags } = nextProps;
    const { requestPosts } = this.props;
    if (tags.length > 0 && tags.length !== this.props.tags.length) {
      return requestPosts(tags);
    }
    if (this.state.homeTags.length === 0) {
      this.fetchFirstTenTags();
    }
  }

  onChange = (value) => this.props.handleTags(value);

  setValue = (value) => this.props.handleTags([value]);

  fetchFirstTenTags = () =>
    fetch(`${BASE_URL}tags?fields=name%2C%20slug&number=10&order=DESC&order_by=count`)
      .then(r => r.json())
      .then(res => {
        this.setState({
          homeTags: res.tags,
        })
      });

  fetchTags = (input) => {
    if (!input) {
			return Promise.resolve({ options: [] });
		}
    console.log(input)
    return fetch(`${BASE_URL}tags?fields=name%2C%20slug&number=50&search=${input}`)
      .then(r => r.json())
      .then(res => {
        console.log({res: res.tags})
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
      homeTags,
    } = this.state;
    const {
      isFetching,
      posts,
      tags,
    } = this.props;
    if (isFetching) {
      return <Loader />
    }
    return (
      <div className="App">
        <Select.Async
          autofocus
          multi
          value={tags}
          name="form-field-name"
          loadOptions={this.fetchTags}
          onChange={this.onChange}
          onValueClick={this.gotoUser}
        />
        <div className="container">
          {
            tags.length > 0
              ? posts.map((p, i) => (
                  <h2 key={i}>
                    <Link
                      to={`/${p.slug}`}
                      className="cards"
                      style={{ backgroundImage: `url(${p.featured_image}?w=640&h=640&crop=1)`}}
                    >
                      <span className="title" dangerouslySetInnerHTML={createMarkup(p.title)} />
                    </Link>
                  </h2>
                ))
              : <div className="pad-1">
                  What's left in your kitchen?
                  <TagWrap>
                    {
                      homeTags.map(
                        (tag, i) =>
                        <InitialTag
                          key={i}
                          className="Select-value-label"
                          onClick={
                            () => this.setValue({
                              value: tag.slug,
                              label: tag.name
                            })
                          }
                        >
                          {tag.name}
                        </InitialTag>
                      )
                    }
                  </TagWrap>
                </div>
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
  handleTags: actions.handleTags,
})(App);
