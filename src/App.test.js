import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { TitleWrap, Title } from './Page';
import renderer from 'react-test-renderer';
import { TEXT_COLOR } from './styles';

jest.mock('react-router', () => 'Route');

test('TitleWrap renders correctly', () => {
  const tree = renderer.create(
    <TitleWrap />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Title renders correctly', () => {
  const tree = renderer.create(
    <Title />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
// });


