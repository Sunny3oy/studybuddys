import Enzyme, { render, shallow } from 'enzyme';
import enzymeAdapterReact16 from 'enzyme-adapter-react-16';
import React from 'react';
import Navbar from './../Home';
import { BrowserRouter as Router } from 'react-router-dom';
import toJson from 'enzyme-to-json';

Enzyme.configure({ adapter: new enzymeAdapterReact16() });
const getDefaultProps = () => ({});
describe('Navbar component', () => {
  it('shallow renders without crashing', () => {
    const {} = getDefaultProps();
    shallow(
        <Router>
            <Navbar />
        </Router>);
  });
  it('render snapshot', () => {
    const {} = getDefaultProps();
    const wrapper = render(
        <Router>
            <Navbar />
        </Router>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
