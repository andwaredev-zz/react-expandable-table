import React from 'react';
import { shallow } from 'enzyme';

import TableHead from '../src/TableHead';
import TableCell from '../src/TableCell';
import { getTotalWidth } from '../src/tableUtil';

describe('TableHead', () => {
  const props = {
    cells: [
      {
        key: 'col1',
        title: 'Col One',
        titleTooltip: 'Column One',
        width: 1
      },
      {
        key: 'col2',
        width: 1
      },
      {
        key: 'col3',
        width: 1
      },
      {
        key: 'col4',
        width: 1
      }
    ],
    expandCellWidth: 60
  };

  let component;
  beforeEach(() => {
    component = shallow(<TableHead {...props} />);
  });

  it('renders without error', () => {
    expect(component.exists()).toBeTruthy();
  });

  it('renders a th wrapping a TableCell component for each cell', () => {
    const ths = component.find('th');
    expect(ths).toHaveLength(4);
    ths.forEach(th => {
      expect(th.find(TableCell)).toHaveLength(1);
    });
  });

  it('passes approrpiate props to each TableCell', () => {
    const { cells, expandCellWidth } = props;
    const ths = component.find('th');
    const totalWidth = getTotalWidth(cells);
    ths.forEach((th, idx) => {
      const cell = cells[idx];
      expect(th.prop('style').width).toEqual(`calc(${cell.width * 100 / totalWidth}% - ${expandCellWidth}px)`);
      expect(th.find(TableCell).prop('tooltip')).toEqual(cell.titleTooltip);
      expect(th.find(TableCell).prop('children')).toEqual(cell.title || cell.key);
    });
  });

  it('if isExpandable, renders expand row cell in leftmost column with no props, pushes other columns down 1', () => {
    const expandableComponent = shallow(<TableHead {...props} isExpandable={true} />);
    const ths = expandableComponent.find('th');
    expect(ths).toHaveLength(props.cells.length + 1);

    const tableCell = ths.at(0).find(TableCell);
    expect(tableCell).toHaveLength(1);
    expect(tableCell.props()).toEqual({});
  });
});
