import React from 'react';
import PropTypes from 'prop-types';

import TableBodyCell from './TableBodyCell';
import TableBodyExpandCellButton from './TableBodyExpandCellButton';

function TableBodyExpandCell({ onClick }) {
  return (
    <TableBodyCell className="expandable-table-body-cell" tooltip="expand row">
      <TableBodyExpandCellButton onClick={onClick} />
    </TableBodyCell>
  );
}

TableBodyExpandCell.propTypes = {
  onClick: PropTypes.func
};

TableBodyExpandCell.defaultProps = {
  onClick: () => {}
};

export default TableBodyExpandCell;
