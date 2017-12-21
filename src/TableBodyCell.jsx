import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import TableCell from './TableCell';

function TableBodyCell({ cellData, children, className, tooltip }) {
  return (
    <td className={classNames('table-body-cell', className)}>
      <TableCell tooltip={tooltip}>
        {typeof children !== 'undefined' && children !== null ? children : cellData}
      </TableCell>
    </td>
  );
}

TableBodyCell.propTypes = {
  cellData: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.number]),
  children: PropTypes.node,
  className: PropTypes.string,
  tooltip: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool])
};

export default TableBodyCell;
