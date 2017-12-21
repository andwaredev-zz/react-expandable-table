import React from 'react';
import { shallow } from 'enzyme';

import TableBodyCell from '../src/TableBodyCell';
import TableCell from '../src/TableCell';

describe('TableBodyCell', () => {
  const props = {
    cellData: 'blah1',
    children: <h3>blah2</h3>,
    className: 'foobar',
    tooltip: 'blah1-tooltip'
  };

  let component;
  beforeEach(() => {
    component = shallow(<TableBodyCell {...props} />);
  });

  it('renders without error', () => {
    expect(component.exists()).toBeTruthy();
  });

  it('renders a td wrapping a TableCell', () => {
    const td = component.find('td');
    expect(td).toHaveLength(1);
    expect(td.find(TableCell)).toHaveLength(1);
  });

  it('sets component className appropriately', () => {
    expect(component.first().prop('className')).toEqual(expect.stringContaining(props.className));
  });

  it('passes appropriate props to TableCell', () => {
    const { children, tooltip } = props;
    const tableCellProps = component.find(TableCell).props();
    expect(tableCellProps.children).toEqual(children);
    expect(tableCellProps.tooltip).toEqual(tooltip);
  });
});
