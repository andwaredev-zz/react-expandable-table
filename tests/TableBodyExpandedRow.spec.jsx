import React from 'react';
import { shallow } from 'enzyme';

import TableBodyExpandedRow from '../src/TableBodyExpandedRow';

describe('TableBodyExpandedRow', () => {
  let component;
  const props = {
    children: <span>hello world</span>,
    columnsCount: 2
  };

  beforeEach(() => {
    component = shallow(<TableBodyExpandedRow {...props} />);
  });

  it('renders without error', () => {
    expect(component.exists()).toBeTruthy();
  });

  it('renders a tr wrapping two tds', () => {
    const tr = component.find('tr');
    expect(tr).toHaveLength(1);
    expect(tr.find('td')).toHaveLength(2);
  });

  it('renders an empty td first', () => {
    const emptyTdProps = component
      .find('tr')
      .find('td')
      .at(0)
      .props();
    const { className, ...otherProps } = emptyTdProps;
    expect(className).toEqual('table-body-expanded-row-empty-td');
    expect(otherProps).toEqual({});
  });

  it('renders a second td with appropriate props', () => {
    const secondTdProps = component
      .find('tr')
      .find('td')
      .at(1)
      .props();
    expect(secondTdProps.colSpan).toEqual(props.columnsCount);
    expect(secondTdProps.children).toEqual(props.children);
  });
});
