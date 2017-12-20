import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import TableBodyCell from '../src/TableBodyCell';
import TableBodyExpandCell from '../src/TableBodyExpandCell';
import TableBodyExpandCellButton from '../src/TableBodyExpandCellButton';

describe('TableBodyExpandCell', () => {
  let component;
  const props = {
    onClick: sinon.stub()
  };

  beforeEach(() => {
    component = shallow(<TableBodyExpandCell {...props} />);
  });

  it('renders without error', () => {
    expect(component.exists()).toBeTruthy();
  });

  it('renders a TableBodyCell', () => {
    expect(component.first().type()).toEqual(TableBodyCell);
  });

  it('passes appropriate props to TableBodyCell', () => {
    const tableBodyCellProps = component.first().props();
    expect(tableBodyCellProps.tooltip).toEqual('expand row');
    expect(tableBodyCellProps.className).toEqual('expandable-table-body-cell');
  });

  it('passes TableBodyExpandCellButton down as child to TableBodyCell', () => {
    expect(
      component
        .first()
        .children()
        .type()
    ).toEqual(TableBodyExpandCellButton);
  });

  it('passes onClick prop down to TableBodyExpandCellButton', () => {
    expect(
      component
        .first()
        .children()
        .prop('onClick')
    ).toEqual(props.onClick);
  });
});
