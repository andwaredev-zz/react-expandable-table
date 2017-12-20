import React from 'react';
import PropTypes from 'prop-types';

import TableBodyRow from './TableBodyRow';

function TableBody({ columns, dataSource, onRowClick }) {
  return (
    <tbody>
      {dataSource.map((rowData, idx) => (
        <TableBodyRow key={idx} idx={idx} columns={columns} onClick={onRowClick} rowData={rowData} />
      ))}
    </tbody>
  );
}

TableBody.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      title: PropTypes.node,
      titleTooltip: PropTypes.string,
      width: PropTypes.number
    })
  ),
  dataSource: PropTypes.arrayOf(PropTypes.object),
  onRowClick: PropTypes.func
};

TableBody.defaultProps = {
  columns: [],
  dataSource: []
};

export default TableBody;
