import * as React from 'react';
import { shallow } from 'enzyme';

describe('Hello tests', () => {
  test('Hello test', () => {
    const wrapper = shallow(
      <div>
        <b className="example">Hello</b>
      </div>,
    );

    expect(
      wrapper.matchesElement(
        <div>
          <b>Hello</b>
        </div>,
      ),
    ).toEqual(true);

    expect(wrapper.containsMatchingElement(<b>Hello</b>)).toEqual(true);

    expect(wrapper.containsMatchingElement(<b className="example">Hello</b>)).toEqual(true);
  });
});
