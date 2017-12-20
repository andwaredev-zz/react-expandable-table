import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import Table from '../src/Table';
import TableBody from '../src/TableBody';
import TableHead from '../src/TableHead';

describe('Table', () => {
  const props = {
    columns: [
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
    ],
    dataSource: [
      {
        key: 'one',
        foo: 'bar1'
      },
      {
        key: 'two',
        foo: 'bar2'
      }
    ],
    emptyText: 'hello world',
    onRowClick: sinon.stub(),
    onRowExpand: sinon.stub()
  };

  let component;
  beforeEach(() => {
    component = shallow(<Table {...props} />);
  });

  it('renders without error', () => {
    expect(component).toHaveLength(1);
  });

  it('getTableHeadCells instance method returns arrray of column with only the necessary attributes', () => {
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
    expect(component.find(TableHead)).toHaveLength(1);
  });

  it('passes appropriate props to TableHead', () => {
    const tableHeadProps = component.find(TableHead).props();
    expect(tableHeadProps.cells).toEqual(component.instance().getTableHeadCells());
    expect(tableHeadProps.isExpandable).toEqual(true);
  });

  it('passes result of getTableHeadCells as cells prop to TableHead', () => {
    expect(component.find(TableHead).prop('cells')).toEqual(component.instance().getTableHeadCells());
  });

  it('passes appropriate props to TableBody', () => {
    const { columns, dataSource, emptyText, onRowClick, onRowExpand } = props;
    const tableBodyProps = component.find(TableBody).props();
    expect(tableBodyProps.columns).toEqual(columns);
    expect(tableBodyProps.dataSource).toEqual(dataSource);
    expect(tableBodyProps.onRowClick).toEqual(onRowClick);
    expect(tableBodyProps.onRowExpand).toEqual(onRowExpand);
    expect(tableBodyProps.emptyText).toEqual(emptyText);
  });

  it('sets className appropriately based on isBordered prop', () => {
    const withoutBorder = shallow(<Table isBordered={false} />);
    expect(withoutBorder.first().prop('className')).not.toEqual(expect.stringContaining('bordered'));

    const withBorder = shallow(<Table isBordered={true} />);
    expect(withBorder.first().prop('className')).toEqual(expect.stringContaining('bordered'));
  });
});
