import React from 'react';
import PropTypes from 'prop-types';

import TableCell from './TableCell';

function TableBodyCell({ cellData, tooltip }) {
  return (
    <td>
      <TableCell tooltip={tooltip}>{cellData}</TableCell>
    </td>
  );
}

TableBodyCell.propTypes = {
  cellData: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.number]),
  tooltip: PropTypes.string
};

TableBodyCell.defaultProps = {
  cellData: null,
  tooltip: null
};

export default TableBodyCell;
