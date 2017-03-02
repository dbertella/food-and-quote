import React from "react";
import {
  Route,
  Link,
} from "react-router-dom";
import Helmet from "react-helmet";
import styled from "styled-components";

import List from "./List";
import Page from "./Page";
import "./App.css";

const Title = styled(Link)`
  color: #fff;
  text-decoration: none;
`;
const App = () => (
  <div className="App">
      <Helmet
        htmlAttributes={{lang: "en", amp: undefined}}
        titleTemplate="%s | Food and quote"
        defaultTitle="Food and quote - 3 ingredient recipes app"
        titleAttributes={{itemprop: "name", lang: "en"}}
        meta={[
            {name: "description", content: "Food and quote is a 3 ingredient recipes food blog with parenting quotes. Find easy recipes for the family and share your experience."},
            {property: "og:type", content: "article"}
        ]}
        link={[
            {rel: "canonical", href: "https://foodandquote.com"},
        ]}
    />
    <div className="App-header">
      <h1><Title to="/">Food and Quote</Title></h1>
    </div>
    <div>
      <Route exact path="/" component={List}/>
      <Route path="/:id" component={Page}/>
    </div>
  </div>
);

export default App;
