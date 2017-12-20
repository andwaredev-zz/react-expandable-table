import React from 'react';
import { shallow } from 'enzyme';

import TableBodyRow from '../src/TableBodyRow';
import TableBodyCell from '../src/TableBodyCell';

describe('TableBodyRow', () => {
  it('renders without error', () => {
    const component = shallow(<TableBodyRow idx={0} />);
    expect(component.exists()).toBeTruthy();
  });

  const columns = [
    {
      key: 'col1',
      title: 'Col One',
      titleTooltip: 'Column One',
      dataTooltip: (cellData, rowData) => `${rowData.name}_${cellData}`,
      render: text => <span>1: {text}</span>,
      width: 1
    },
    {
      key: 'col2',
      title: 'Col Two',
      render: text => <span>2: {text}</span>,
      width: 1
    },
    {
      key: 'col3',
      title: 'Col Three',
      render: text => <span>3: {text}</span>,
      width: 1
    },
    {
      key: 'col4',
      title: 'Col Four',
      render: text => <span>4: {text}</span>,
      width: 1
    }
  ];

  const rowData = {
    key: 'one',
    name: 'john',
    col1: 'blah1',
    col2: 'blah2'
  };

  it('renders a tableBodyCell for each element in columns', () => {
    const component = shallow(<TableBodyRow idx={0} columns={columns} rowData={rowData} />);
    const tableBodyCells = component.find(TableBodyCell);
    expect(tableBodyCells).toHaveLength(4);
  });

  it('passes appropriate props to each TableBodyCell', () => {
    const component = shallow(<TableBodyRow idx={0} columns={columns} rowData={rowData} />);
    const tableBodyCells = component.find(TableBodyCell);
    tableBodyCells.forEach((tableBodyCell, idx) => {
      const { dataTooltip, key } = columns[idx];
      const cellData = rowData[key];
      expect(tableBodyCell.key()).toEqual(`0_tbody_tr_${key}_td`);
      expect(tableBodyCell.prop('cellData')).toEqual(cellData || null);
      expect(tableBodyCell.prop('tooltip')).toEqual(dataTooltip ? dataTooltip(cellData, rowData) : null);
    });
  });
});
