import Enzyme, { render, shallow } from 'enzyme';
import enzymeAdapterReact16 from 'enzyme-adapter-react-16';
import React from 'react';
import Browser from './../Browser';
import { BrowserRouter as Router } from 'react-router-dom';
import toJson from 'enzyme-to-json';

Enzyme.configure({ adapter: new enzymeAdapterReact16() });
const getDefaultProps = () => ({});
describe('Browser component', () => {
  it('shallow renders without crashing', () => {
    const {} = getDefaultProps();
    shallow(
        <Router>
            <Browser />
        </Router>);
  });
  it('render snapshot', () => {
    const {} = getDefaultProps();
    const wrapper = render(
        <Router>
            <Browser />
        </Router>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
