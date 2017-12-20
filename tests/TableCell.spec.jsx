import React from 'react';
import { shallow } from 'enzyme';

import TableCell from '../src/TableCell';
import TooltipWrapper from '../src/TooltipWrapper';

describe('TableCell', () => {
  it('renders without error', () => {
    const component = shallow(<TableCell />);
    expect(component.exists()).toBeTruthy();
  });

  it('renders TooltipWrapper with children', () => {
    const child = <div className="child" />;
    const component = shallow(<TableCell>{child}</TableCell>);
    const tooltipWrapper = component.find(TooltipWrapper);

    expect(tooltipWrapper).toHaveLength(1);
    expect(tooltipWrapper.prop('children')).toEqual(child);
  });
});
