import React from 'react';
import { expect } from 'chai';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import VideoLength from './VideoLength';

configure({ adapter: new Adapter() });

describe('<VideoLength length=222 />', () => {
    it('renders a div with the given length', () => {
        const wrapper = shallow(<VideoLength length="222" />);
        expect(wrapper.find('div')).to.have.length(1);
        expect(wrapper.props().children).to.equal('222');
    });
});
