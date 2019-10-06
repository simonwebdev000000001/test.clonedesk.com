import React from 'react';
import { Login } from './index.tsx';
import { shallow } from 'enzyme';

let props = {
  setVal: () => {
  },
};
describe('Login', () => {
  beforeAll(() => {

  });
  it('should fail if no credentials are provided', () => {
    const fakeEvent = {
      stopPropagation: () => console.log('stopPropagation'),
      preventDefault: () => console.log('preventDefault'),
    };
    const component = shallow(
      <Login {...props}/>,
    );
    expect(component).toMatchSnapshot();
    expect(component.find('#form').length).toBe(1);
    component.find('#form').simulate('submit', fakeEvent);
    expect(component.state('error')).toEqual({ email: 'Field is required' });
  });
  it('should validate user inputs', () => {

  });
});
