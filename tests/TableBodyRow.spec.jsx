import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import TableBodyRow from '../src/TableBodyRow';
import TableBodyCell from '../src/TableBodyCell';
import TableBodyExpandCell from '../src/TableBodyExpandCell';

describe('TableBodyRow', () => {
  const props = {
    columns: [
      {
        key: 'col1',
        title: 'Col One',
        titleTooltip: 'Column One',
        dataTooltip: (cellData, rowData) => `${rowData.name}_${cellData}`,
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
    ],
    expandButtonRender: sinon.stub(),
    idx: 0,
    onClick: sinon.spy(),
    onExpandClick: sinon.spy,
    rowData: {
      key: 'one',
      name: 'john',
      col1: 'blah1',
      col2: 'blah2'
    }
  };

  let component;
  beforeEach(() => {
    component = shallow(<TableBodyRow {...props} />);
  });

  it('renders without error', () => {
    expect(component.exists()).toBeTruthy();
  });

  it('renders a tableBodyCell for each element in columns', () => {
    const tableBodyCells = component.find(TableBodyCell);
    expect(tableBodyCells).toHaveLength(4);
  });

  it('passes appropriate props to each TableBodyCell', () => {
    const { columns, rowData } = props;
    const tableBodyCells = component.find(TableBodyCell);
    tableBodyCells.forEach((tableBodyCell, idx) => {
      const { dataTooltip, key } = columns[idx];
      const cellData = rowData[key];
      expect(tableBodyCell.key()).toEqual(`0_tbody_tr_${key}_td`);
      expect(tableBodyCell.prop('cellData')).toEqual(cellData);
      expect(tableBodyCell.prop('tooltip')).toEqual(dataTooltip ? dataTooltip(cellData, rowData) : cellData);
    });
  });

  it('if not isExpandable, does not render TableBodyExpandCell', () => {
    const expandableComponent = shallow(<TableBodyRow {...props} isExpandable={false} />);
    expect(expandableComponent.find(TableBodyExpandCell)).toHaveLength(0);
  });

  it('if isExpandable, renders TableBodyExpandCell', () => {
    const expandableComponent = shallow(<TableBodyRow {...props} isExpandable={true} />);
    expect(expandableComponent.find(TableBodyExpandCell)).toHaveLength(1);
  });

  it('passes appropriate props to TableBodyExpandCell', () => {
    const handleExpandClickSpy = sinon.spy(TableBodyRow.prototype, 'handleExpandClick');
    const expandableComponent = shallow(<TableBodyRow {...props} isExpandable={true} isExpanded={true} />);
    const tableBodyExpandCellProps = expandableComponent.find(TableBodyExpandCell).props();
    expect(handleExpandClickSpy.called).toBeFalsy();
    const fakeEvent = { foo: 'bar' };
    tableBodyExpandCellProps.onClick(fakeEvent);
    expect(handleExpandClickSpy.called).toBeTruthy();
    expect(handleExpandClickSpy.firstCall.args[0]).toEqual(fakeEvent);
    expect(tableBodyExpandCellProps.isExpanded).toEqual(true);
    expect(tableBodyExpandCellProps.expandButtonRender).toEqual(props.expandButtonRender);
  });

  it('if column.render is a function, passes custom rendered node as child to TableBodyCell', () => {
    const expandableComponent = shallow(
      <TableBodyRow
        {...props}
        columns={[
          {
            ...props.columns[0],
            render: cellData => <h1>{cellData}</h1>
          },
          ...props.columns.slice(1)
        ]}
        isExpandable={true}
        isExpanded={true}
      />
    );
    const tableBodyCells = expandableComponent.find(TableBodyCell);

    expect(tableBodyCells.at(0).prop('children')).toEqual(<h1>{props.rowData[props.columns[0].key]}</h1>);
    for (let i = 1; i < props.columns.length; i += 1) {
      expect(tableBodyCells.at(i).prop('children')).toBeUndefined();
    }
  });

  it('if isExpandable, renders TableBodyExpandCell in leftmost column, pushes other cells down 1', () => {
    const expandableComponent = shallow(<TableBodyRow {...props} isExpandable={true} />);
    expect(
      expandableComponent
        .children()
        .at(0)
        .type()
    ).toEqual(TableBodyExpandCell);

    for (let i = 1; i < 5; i += 1) {
      expect(
        expandableComponent
          .children()
          .at(i)
          .type()
      ).toEqual(TableBodyCell);
    }
  });

  it('sets TableBodyExpandCell onClick prop to handleExpandClick instance method', () => {
    const expandableComponent = shallow(<TableBodyRow {...props} isExpandable />);
    expect(expandableComponent.find(TableBodyExpandCell).prop('onClick')).toEqual(
      expandableComponent.instance().handleExpandClick
    );
  });

  it('handleClick instance method calls onClick prop (if defined) with rowData, and rowIndex', () => {
    const { rowData, idx } = props;
    component.instance().handleClick();
    expect(props.onClick.called).toBeTruthy();
    expect(props.onClick.firstCall.args).toEqual([rowData, idx]);
  });

  it('component onClick set to handleClick instance method', () => {
    expect(component.first().prop('onClick')).toEqual(component.instance().handleClick);
  });
});
