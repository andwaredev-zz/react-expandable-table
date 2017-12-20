import React from 'react';
import { shallow } from 'enzyme';

import TooltipWrapper from '../src/TooltipWrapper';

describe('TooltipWrapper', () => {
  it('renders without error', () => {
    const component = shallow(<TooltipWrapper />);
    expect(component.exists()).toBeTruthy();
  });

  it('wraps children prop in a div', () => {
    const child = <span className="child" />;
    const component = shallow(<TooltipWrapper>{child}</TooltipWrapper>);
    const wrapperDiv = component.find('div');
    expect(wrapperDiv).toHaveLength(1);
    expect(wrapperDiv.prop('children')).toEqual(child);
  });

  it('sets wrapper div title prop to provided tooltip prop', () => {
    const component = shallow(<TooltipWrapper tooltip="tooltip">child</TooltipWrapper>);
    const wrapperDiv = component.find('div');
    expect(wrapperDiv.prop('title')).toEqual('tooltip');
  });

  it('sets wrapper div title prop to child if tooltip not provided, and if child is a string', () => {
    const component = shallow(<TooltipWrapper>child</TooltipWrapper>);
    const wrapperDiv = component.find('div');
    expect(wrapperDiv.prop('title')).toEqual('child');
  });

  it('does not set wrapper div title prop if tooltip not provided, and if child is not a string', () => {
    const component = shallow(
      <TooltipWrapper>
        <span>child</span>
      </TooltipWrapper>
    );
    const wrapperDiv = component.find('div');
    expect(wrapperDiv.prop('title')).toBeUndefined();
  });
});
