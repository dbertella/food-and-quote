// @flow
import React from "react";
import styled from "styled-components";

import logo from '../img/icon.png';

const Logo = styled.img`
  width: 36px;
`

export default ({ onClick }: {onClick: Function}) => (
  <Logo src={logo} alt="Food and quote logo"  />
);