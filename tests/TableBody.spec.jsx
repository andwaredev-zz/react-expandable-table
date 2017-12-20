import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import TableBody from '../src/TableBody';
import TableBodyRow from '../src/TableBodyRow';

describe('TableBody', () => {
  it('renders without error', () => {
    const component = shallow(<TableBody />);
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

  const dataSource = [
    {
      key: 'one',
      name: 'john',
      col1: 'blah1',
      col2: 'blah2'
    },
    {
      key: 'two',
      name: 'jane',
      col1: 'blah1',
      col2: 'blah2',
      col4: 'hello'
    }
  ];

  it('renders a TableBodyRow for each element in dataSource', () => {
    const component = shallow(<TableBody columns={columns} dataSource={dataSource} />);
    const tableBodyRows = component.find(TableBodyRow);
    expect(tableBodyRows).toHaveLength(2);
  });

  it('passes appropriate props to each TableBodyRow', () => {
    const onRowClickStub = sinon.stub();
    const component = shallow(<TableBody columns={columns} dataSource={dataSource} onRowClick={onRowClickStub} />);
    const tableBodyRows = component.find(TableBodyRow);
    tableBodyRows.forEach((tableBodyRow, idx) => {
      expect(tableBodyRow.key()).toEqual(idx.toString());
      expect(tableBodyRow.prop('idx')).toEqual(idx);
      expect(tableBodyRow.prop('columns')).toEqual(columns);
      expect(tableBodyRow.prop('onClick')).toEqual(onRowClickStub);
      expect(tableBodyRow.prop('rowData')).toEqual(dataSource[idx]);
    });
  });
});
