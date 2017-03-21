import React, { Component } from 'react';
import Infinite from 'react-infinite';
import styled from 'styled-components';

import {
  Link,
} from 'react-router-dom';
import Container from './components/Container';
import { createMarkup } from './utils';

const Card = styled(Link)`
  display: flex;
  align-items: flex-end;
  min-height: 230px;
  text-decoration: none;
  background-size: cover;
  background-position: center center;
`

const Title = styled.span`
  width: 100%;
  padding: 0.5em;
  color: #fff;
  background: rgba(0,0,0, 0.3);
`

class List extends Component {
  state = {
    loading: false,
  }
  componentWillUpdate(nextProps) {
    const { posts } = this.props;
    if (posts.length !== nextProps.posts.length) {
      this.setState({ loading: false });
    }
  }
  handleInfiniteLoad = () => {
    const { page, maxPages, loadMore } = this.props;
    if (page < maxPages) {
      this.setState({
        loading: true,
      }, () => loadMore(page + 1));
    }
  };
  render() {
    const { posts, maxPages } = this.props;
    return (
      <Container>
        <Infinite
          useWindowAsScrollContainer
          elementHeight={260}
          infiniteLoadBeginEdgeOffset={520}
          onInfiniteLoad={this.handleInfiniteLoad}
          isInfiniteLoading={this.state.loading}
        >
          {
            posts.map((p, i) => (
                <h2 key={i}>
                  <Card
                    to={`/recipe/${p.slug}`}
                    style={{ backgroundImage: `url(${p.featured_image}?w=640&h=640&crop=1)`}}
                  >
                    <Title dangerouslySetInnerHTML={createMarkup(p.title)} />
                  </Card>
                </h2>
              ))
            }
        </Infinite>
      </Container>
    )
  }
};

export default List;
