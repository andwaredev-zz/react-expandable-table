import React from 'react';
import { shallow } from 'enzyme';

import TableBodyCell from '../src/TableBodyCell';
import TableCell from '../src/TableCell';

describe('TableBodyCell', () => {
  it('renders without error', () => {
    const component = shallow(<TableBodyCell />);
    expect(component.exists()).toBeTruthy();
  });

  const cellData = 'blah1';
  const tooltip = 'blah1-tooltip';

  it('renders a td wrapping a TableCell', () => {
    const component = shallow(<TableBodyCell cellData={cellData} tooltip={tooltip} />);
    const td = component.find('td');
    expect(td).toHaveLength(1);
    expect(td.find(TableCell)).toHaveLength(1);
  });

  it('passes appropriate props to TableCell', () => {
    const component = shallow(<TableBodyCell cellData={cellData} tooltip={tooltip} />);
    const tableCellProps = component.find(TableCell).props();
    expect(tableCellProps.children).toEqual(cellData);
    expect(tableCellProps.tooltip).toEqual(tooltip);
  });
});
