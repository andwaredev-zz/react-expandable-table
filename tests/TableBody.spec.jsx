import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import TableBody from '../src/TableBody';
import TableBodyEmpty from '../src/TableBodyEmpty';
import TableBodyRow from '../src/TableBodyRow';
import TableBodyExpandedRow from '../src/TableBodyExpandedRow';

describe('TableBody', () => {
  const props = {
    columns: [
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
    ],
    dataSource: [
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
    ],
    emptyText: 'hello world',
    onRowClick: sinon.stub(),
    onRowExpand: sinon.stub()
  };

  const setupComponent = propOverrides => shallow(<TableBody {...props} {...propOverrides} />);

  let component;
  beforeEach(() => {
    component = setupComponent();
  });

  it('renders without error', () => {
    expect(component.exists()).toBeTruthy();
  });

  it('renders TableBodyEmpty if dataSource is empty', () => {
    const emptyComponent = setupComponent({ dataSource: [] });
    expect(emptyComponent.first().type()).toEqual(TableBodyEmpty);
  });

  it('passes down appropriate props to TableBodyEmpty if dataSource is empty', () => {
    const { columns, emptyText } = props;
    const emptyComponent = setupComponent({ dataSource: [] });
    const tableBodyEmptyProps = emptyComponent.first().props();
    expect(tableBodyEmptyProps.columnsCount).toEqual(columns.length);
    expect(tableBodyEmptyProps.text).toEqual(emptyText);
  });

  it('renders a TableBodyRow for each element in dataSource', () => {
    const tableBodyRows = component.find(TableBodyRow);
    expect(tableBodyRows).toHaveLength(2);
  });

  it('passes appropriate props to each TableBodyRow', () => {
    const { columns, dataSource, onRowClick } = props;
    const tableBodyRows = component.find(TableBodyRow);
    tableBodyRows.forEach((tableBodyRow, idx) => {
      expect(tableBodyRow.key()).toEqual(idx.toString());
      expect(tableBodyRow.prop('idx')).toEqual(idx);
      expect(tableBodyRow.prop('columns')).toEqual(columns);
      expect(tableBodyRow.prop('onClick')).toEqual(onRowClick);
      expect(tableBodyRow.prop('isExpandable')).toEqual(true);
      expect(tableBodyRow.prop('onExpandClick')).toEqual(component.instance().toggleRowExpand);
      expect(tableBodyRow.prop('rowData')).toEqual(dataSource[idx]);
    });
  });

  it('does not render a TableBodyExpandedRow if state.expandedRowIndices does not contain rowIndex', () => {
    component.setState({ expandedRowIndices: {} });
    component.update();

    expect(component.find('tbody').find(TableBodyExpandedRow)).toHaveLength(0);
  });

  it('renders a TableBodyExpandedRow directly proceeding the row with rowIndex contained in state.expandedRowIndices', () => {
    const rowIndex = 0;
    component.setState({ expandedRowIndices: { [rowIndex]: true } });
    component.update();

    expect(
      component
        .find('tbody')
        .children()
        .at(rowIndex)
        .type()
    ).toEqual(TableBodyRow);

    expect(
      component
        .find('tbody')
        .children()
        .at(rowIndex + 1)
        .type()
    ).toEqual(TableBodyExpandedRow);
  });

  it('toggleRowExpand instance method toggles the boolean value corresponding to the rowIndex in state.expandedRowIndices', () => {
    component.setState({ expandedRowIndices: { 0: false } });
    component.update();

    component.instance().toggleRowExpand(0);
    expect(component.state('expandedRowIndices')).toEqual({ 0: true });
  });

  it('toggleRowExpand instance method inserts new true record (if one does not already exist) for rowIndex in state.expandedRowIndices', () => {
    component.setState({ expandedRowIndices: {} });
    component.update();

    component.instance().toggleRowExpand(0);
    expect(component.state('expandedRowIndices')).toEqual({ 0: true });
  });
});
