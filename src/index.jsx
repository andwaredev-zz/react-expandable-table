import React from 'react';
import ReactDOM from 'react-dom';

import Table from './Table';

const exampleProps = {
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
  ]
};

ReactDOM.render(<Table {...exampleProps} />, document.getElementById('root'));
