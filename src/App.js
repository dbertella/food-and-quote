import React from "react";
import {
  Route,
} from "react-router-dom";
import Helmet from "react-helmet";
import styled from "styled-components";
import List from "./List";
import Page from "./Page";
import Search from "./Search";
import Tag from "./views/Tag";
import Category from "./views/Category";
import "./App.css";

const App = () => (
  <div>
      <Helmet
        htmlAttributes={{lang: "en", amp: undefined}}
        titleTemplate="%s | Food and quote"
        defaultTitle="Food and quote - 3 ingredient recipes app"
        titleAttributes={{itemprop: "name", lang: "en"}}
        meta={[
            {name: "description", content: "Food and quote is a 3 ingredient recipes food blog with parenting quotes. Find easy recipes for the family and share your experience."},
            {property: "og:type", content: "article"}
        ]}
    />
    <Route exact path="/" component={Search} />
    <Route path="/t/:tag" component={Tag} />
    <Route path="/c/:category" component={Category} />
    <Route path="/recipe/:id" component={Page} />
  </div>
);

export default App;
