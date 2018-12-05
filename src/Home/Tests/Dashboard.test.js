import Enzyme, { render, shallow } from 'enzyme';
import enzymeAdapterReact16 from 'enzyme-adapter-react-16';
import React from 'react';
import Dashboard from './../Dashboard';
import { BrowserRouter as Router } from 'react-router-dom';
import toJson from 'enzyme-to-json';

Enzyme.configure({ adapter: new enzymeAdapterReact16() });
const getDefaultProps = () => ({});
describe('Dashboard component', () => {
  it('shallow renders without crashing', () => {
    const {} = getDefaultProps();
    shallow(
        <Router>
            <Dashboard />
        </Router>);
  });
  it('render snapshot', () => {
    const {} = getDefaultProps();
    const wrapper = render(
        <Router>
            <Dashboard />
        </Router>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
