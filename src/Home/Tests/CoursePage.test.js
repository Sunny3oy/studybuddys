import Enzyme, { render, shallow } from 'enzyme';
import enzymeAdapterReact16 from 'enzyme-adapter-react-16';
import React from 'react';
import CoursePage from './../CoursePage';
import { BrowserRouter as Router } from 'react-router-dom';
import toJson from 'enzyme-to-json';

Enzyme.configure({ adapter: new enzymeAdapterReact16() });
const getDefaultProps = () => ({});
describe('CoursePage component', () => {
  it('shallow renders without crashing', () => {
    const {} = getDefaultProps();
    shallow(
        <Router>
            <CoursePage />
        </Router>);
  });
  it('render snapshot', () => {
    const {} = getDefaultProps();
    const wrapper = render(
        <Router>
            <CoursePage />
        </Router>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
