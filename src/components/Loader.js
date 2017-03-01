// @flow
import React from "react";
import styled, { keyframes } from 'styled-components';

import { TEXT_COLOR } from '../styles';

// keyframes returns a unique name based on a hash of the contents of the keyframes
const rotate360 = keyframes`
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(-30deg);
  }
  50% {
    transform: rotate(0deg);
  }
  75% {
    transform: rotate(30deg);
  }
  100% {
    transform: rotate(0);
  }
`;

const blink = keyframes`
  50% { color: transparent }
`;

const LoaderDot = styled.span`
  animation: ${blink} 1s infinite;
  &:nth-child(2) {
    animation-delay: 250ms;
  };
  &:nth-child(3) {
    animation-delay: 500ms
  }
`;

// Here we create a component that will rotate everything we pass in over two seconds
const Rotate = styled.svg`
  animation: ${rotate360} 2s linear infinite;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2em;
`;
const Path = styled.path`
  fill: ${TEXT_COLOR};
`;

const Loader = () => (
  <Wrapper>
    <Rotate width="160px" height="160px" viewBox="0 0 160 160" enable-background="new 0 0 160 160">
      <Path id="carrot" d="M105,19c2.209,0,4-1.791,4-4s-1.791-4-4-4c-9.76,0-18.402,4.851-23.66,12.263
        c-0.432-1.324-0.901-2.639-1.438-3.934C77.177,12.761,73.235,6.87,68.185,1.817c-1.562-1.563-4.094-1.563-5.657-0.001
        s-1.563,4.095-0.001,5.657c2.049,2.05,3.876,4.266,5.487,6.624C64.097,12.12,59.678,11,55,11c-2.209,0-4,1.791-4,4s1.791,4,4,4
        c11.58,0,21,9.42,21,21v1h-1c-2.519,0-4.966,0.485-7.274,1.443c-2.313,0.959-4.385,2.346-6.161,4.121
        c-1.776,1.776-3.163,3.849-4.122,6.162C56.486,55.037,56,57.484,56,60c0,0.309,0.036,0.616,0.106,0.916l1.218,5.176
        c0.013,0.066,0.03,0.13,0.046,0.195l18.736,79.629C76.531,147.723,78.144,149,80,149c1.855,0,3.469-1.277,3.895-3.084l20-85
        c0.07-0.3,0.105-0.607,0.105-0.916c0-2.516-0.486-4.963-1.443-7.274c-0.959-2.313-2.346-4.386-4.121-6.162
        c-1.775-1.775-3.85-3.162-6.162-4.122C89.967,41.485,87.52,41,85,41h-1v-1C84,28.42,93.42,19,105,19z M89.209,49.833
        c1.338,0.555,2.539,1.359,3.568,2.39c1.031,1.029,1.834,2.229,2.389,3.567c0.499,1.203,0.775,2.473,0.826,3.781l-5.127,21.785H85
        c-2.209,0-4,1.791-4,4s1.791,4,4,4h3.982L80,127.535l-13.689-58.18H75c2.209,0,4-1.791,4-4s-1.791-4-4-4H64.428l-0.42-1.785
        c0.05-1.308,0.327-2.578,0.826-3.781c0.554-1.338,1.357-2.538,2.388-3.568c1.03-1.03,2.231-1.834,3.569-2.389
        C72.123,49.28,73.539,49,75,49h10C86.461,49,87.877,49.28,89.209,49.833z"/>
    </Rotate>
    <span>
      {'Loading '}
      <LoaderDot>.</LoaderDot>
      <LoaderDot>.</LoaderDot>
      <LoaderDot>.</LoaderDot>
    </span>
  </Wrapper>
)

export default Loader;
