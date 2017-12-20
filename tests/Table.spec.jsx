import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

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

  it('passes appropriate props to TableHead', () => {
    const component = shallow(<Table columns={columns} onRowExpand={sinon.stub()} />);
    const tableHeadProps = component.find(TableHead).props();
    expect(tableHeadProps.cells).toEqual(component.instance().getTableHeadCells());
    expect(tableHeadProps.isExpandable).toEqual(true);
  });

  it('passes result of getTableHeadCells as cells prop to TableHead', () => {
    const component = shallow(<Table columns={columns} />);
    expect(component.find(TableHead).prop('cells')).toEqual(component.instance().getTableHeadCells());
  });

  it('passes appropriate props to TableBody', () => {
    const onRowClickStub = sinon.stub();
    const onRowExpandStub = sinon.stub();
    const component = shallow(
      <Table columns={columns} dataSource={dataSource} onRowClick={onRowClickStub} onRowExpand={onRowExpandStub} />
    );
    const tableBodyProps = component.find(TableBody).props();
    expect(tableBodyProps.columns).toEqual(columns);
    expect(tableBodyProps.dataSource).toEqual(dataSource);
    expect(tableBodyProps.onRowClick).toEqual(onRowClickStub);
    expect(tableBodyProps.onRowExpand).toEqual(onRowExpandStub);
  });

  it('sets className appropriately based on isBordered prop', () => {
    const withoutBorder = shallow(<Table isBordered={false} />);
    expect(withoutBorder.first().prop('className')).not.toEqual(expect.stringContaining('bordered'));

    const withBorder = shallow(<Table isBordered={true} />);
    expect(withBorder.first().prop('className')).toEqual(expect.stringContaining('bordered'));
  });
});
