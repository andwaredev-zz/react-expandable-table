import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import TableBodyExpandCellButton from '../src/TableBodyExpandCellButton';

describe('TableBodyExpandCellButton', () => {
  const props = {
    onClick: sinon.stub()
  };

  let component;
  const setupComponent = propOverrides => {
    component = shallow(<TableBodyExpandCellButton {...props} {...propOverrides} />);
  };

  beforeEach(() => {
    setupComponent();
  });

  it('renders without error', () => {
    expect(component).toHaveLength(1);
  });

  it('renders button', () => {
    expect(component.find('button')).toHaveLength(1);
  });

  it('passes onClick prop down to button', () => {
    expect(component.find('button').prop('onClick')).toEqual(props.onClick);
  });

  it('shows - if isExpanded', () => {
    setupComponent({ isExpanded: true });
    expect(component.find('button').text()).toEqual('-');
  });

  it('shows + if not isExpanded', () => {
    setupComponent({ isExpanded: false });
    expect(component.find('button').text()).toEqual('+');
  });
});
