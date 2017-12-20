import React from 'react';
import { shallow } from 'enzyme';

import TableHead from '../src/TableHead';
import TableCell from '../src/TableCell';
import { getTotalWidth } from '../src/tableUtil';

describe('TableHead', () => {
  it('renders without error', () => {
    const component = shallow(<TableHead />);
    expect(component.exists()).toBeTruthy();
  });

  const cells = [
    {
      key: 'col1',
      title: 'Col One',
      titleTooltip: 'Column One',
      width: 1
    },
    {
      key: 'col2',
      title: 'Col Two',
      width: 1
    },
    {
      key: 'col3',
      title: 'Col Three',
      width: 1
    },
    {
      key: 'col4',
      title: 'Col Four',
      width: 1
    }
  ];

  it('renders a th wrapping a TableCell component for each cell', () => {
    const component = shallow(<TableHead cells={cells} />);
    const ths = component.find('th');
    expect(ths).toHaveLength(4);
    ths.forEach(th => {
      expect(th.find(TableCell)).toHaveLength(1);
    });
  });

  it('passes approrpiate props to each TableCell', () => {
    const component = shallow(<TableHead cells={cells} />);
    const ths = component.find('th');
    const totalWidth = getTotalWidth(cells);
    ths.forEach((th, idx) => {
      const cell = cells[idx];
      expect(th.find(TableCell).prop('style').width).toEqual(`${cell.width * 100 / totalWidth}%`);
      expect(th.find(TableCell).prop('tooltip')).toEqual(cell.titleTooltip || null);
      expect(th.find(TableCell).prop('children')).toEqual(cell.title);
    });
  });
});
