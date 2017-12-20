import React from 'react';
import { shallow } from 'enzyme';

import Table from '../src/Table';
import TableBody from '../src/TableBody';
import TableHead from '../src/TableHead';

describe('Table', () => {
  const columns = [
    {
      key: 'col1',
      title: 'Col One',
      titleTooltip: 'Column One',
      render: text => <span>1: {text}</span>,
      width: 1
    },
    {
      key: 'col2',
      title: 'Col Two',
      titleTooltip: 'Column Two',
      render: text => <span>2: {text}</span>,
      width: 1
    }
  ];

  const dataSource = [
    {
      key: 'one',
      foo: 'bar1'
    },
    {
      key: 'two',
      foo: 'bar2'
    }
  ];

  it('renders without error', () => {
    const component = shallow(<Table />);
    expect(component).toHaveLength(1);
  });

  it('getTableHeadCells instance method returns arrray of column with only the necessary attributes', () => {
    const component = shallow(<Table columns={columns} />);
    const actual = component.instance().getTableHeadCells();
    const expected = [
      {
        key: 'col1',
        title: 'Col One',
        titleTooltip: 'Column One',
        width: 1
      },
      {
        key: 'col2',
        title: 'Col Two',
        titleTooltip: 'Column Two',
        width: 1
      }
    ];

    expect(actual).toEqual(expected);
  });

  it('renders TableHead', () => {
    const component = shallow(<Table columns={columns} />);
    expect(component.find(TableHead)).toHaveLength(1);
  });

  it('passes result of getTableHeadCells as cells prop to TableHead', () => {
    const component = shallow(<Table columns={columns} />);
    expect(component.find(TableHead).prop('cells')).toEqual(component.instance().getTableHeadCells());
  });

  it('passes appropriate props to TableBody', () => {
    const component = shallow(<Table columns={columns} dataSource={dataSource} />);
    const tableBodyProps = component.find(TableBody).props();
    expect(tableBodyProps.columns).toEqual(columns);
    expect(tableBodyProps.dataSource).toEqual(dataSource);
  });
});
