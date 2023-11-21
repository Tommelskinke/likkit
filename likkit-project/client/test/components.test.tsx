import * as React from 'react';
import { Menu, Home } from '../src/Components/homepage-component';
import { FavoriteList } from '../src/Components/favorites-component';
import { shallow } from 'enzyme';
import { EditPost } from '../src/Components/editPosts-component';
import { CreatePost } from '../src//Components/createPosts-component';
import { AllPostsTag } from '../src/Components/allPostsTag-component';
import { Form, Button, Column, Alert } from '../src/widgets';
import { ViewPost } from '../src/Components/viewPosts-component';
import { Login } from '../src//Components/auth-component';
import { NavLink } from 'react-router-dom';
import { UserProvider } from '../src/authState';
import { AllPosts } from '../src/Components/allPosts-component';
import PrettyPreview from '../src/Components/prettyPreview-component';

describe('Component tests', () => {
  test('FavoriteList', (done) => {
    const wrapper = shallow(<FavoriteList />);

    // Wait for events to complete
    setTimeout(() => {
      expect(wrapper).toMatchSnapshot();
      done();
    });
  });
  test('Login', (done) => {
    const match = { params: { id: 1 } }; // replace 123 with an appropriate id
    const wrapper = shallow(<Login match={match} />);

    // Wait for events to complete
    setTimeout(() => {
      expect(wrapper).toMatchSnapshot();
      done();
    });
  });
  test('All Posts', (done) => {
    const wrapper = shallow(<AllPosts />);

    // Wait for events to complete
    setTimeout(() => {
      expect(wrapper).toMatchSnapshot();
      done();
    });
  });
  test('All Post tags', (done) => {
    const wrapper = shallow(<AllPostsTag />);

    // Wait for events to complete
    setTimeout(() => {
      expect(wrapper).toMatchSnapshot();
      done();
    });
  });
});

describe('PrettyPreview', () => {
  it('should strip HTML tags', () => {
    const wrapper = shallow(<PrettyPreview htmlContent="<p>Hello, world!</p>" />);
    expect(wrapper.text()).toEqual('Hello, world!');
  });

  it('should truncate text', () => {
    const wrapper = shallow(<PrettyPreview htmlContent="<p>Hello, world!</p>" maxLength={5} />);
    expect(wrapper.text()).toEqual('Hello...');
  });

  it('should render correctly', () => {
    const wrapper = shallow(<PrettyPreview htmlContent="<p>Hello, world!</p>" />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('widget tests', () => {
  test('alert', (done) => {
    const wrapper = shallow(<Alert />);

    // Wait for events to complete
    setTimeout(() => {
      expect(wrapper).toMatchSnapshot();
      done();
    });
  });
  test('Logiasffsan', (done) => {
    const match = { params: { id: 1 } }; // replace 123 with an appropriate id
    const wrapper = shallow(<ViewPost match={match} />);

    // Wait for events to complete
    setTimeout(() => {
      expect(wrapper).toMatchSnapshot();
      done();
    });
  });
});
