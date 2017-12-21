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
      expect(tableBodyCell.prop('tooltip')).toEqual(dataTooltip ? dataTooltip(cellData, rowData) : undefined);
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
