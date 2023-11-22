import * as React from 'react';
import { shallow } from 'enzyme';
import { AllPostsTag } from '../src/Components/allPostsTag-component';
import { Alert } from '../src/widgets';
import { AllPosts } from '../src/Components/allPosts-component';

describe('Component tests', () => {
  test('All Posts', (done) => {
    const wrapper = shallow(<AllPosts />);

    setTimeout(() => {
      expect(wrapper).toMatchSnapshot();
      done();
    });
  });
  test('All Post tags', (done) => {
    const wrapper = shallow(<AllPostsTag />);

    setTimeout(() => {
      expect(wrapper).toMatchSnapshot();
      done();
    });
  });
});

describe('widget tests', () => {
  test('alert', (done) => {
    const wrapper = shallow(<Alert />);

    setTimeout(() => {
      expect(wrapper).toMatchSnapshot();
      done();
    });
  });
});
