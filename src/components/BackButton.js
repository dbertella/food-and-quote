// @flow
import React from "react";
import styled from "styled-components";

const BackButton = styled.button`
  border: 0;
  background: transparent;
  cursor: pointer;
`;
const Svg = styled.svg`
  width: 3em;
  height: 3em;
`;
const Path = styled.path`
  fill: #fff;
`;

export default ({ onClick }: {onClick: Function}) => (
  <BackButton onClick={onClick}>
    <Svg viewBox="0 0 20 20">
      <Path fill="none" d="M8.388,10.049l4.76-4.873c0.303-0.31,0.297-0.804-0.012-1.105c-0.309-0.304-0.803-0.293-1.105,0.012L6.726,9.516c-0.303,0.31-0.296,0.805,0.012,1.105l5.433,5.307c0.152,0.148,0.35,0.223,0.547,0.223c0.203,0,0.406-0.08,0.559-0.236c0.303-0.309,0.295-0.803-0.012-1.104L8.388,10.049z"></Path>
    </Svg>
  </BackButton>
);