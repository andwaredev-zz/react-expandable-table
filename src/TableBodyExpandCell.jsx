import React from 'react';
import PropTypes from 'prop-types';

import TableBodyCell from './TableBodyCell';
import TableBodyExpandCellButton from './TableBodyExpandCellButton';

function TableBodyExpandCell({ onClick, isExpanded }) {
  return (
    <TableBodyCell className="expandable-table-body-cell" tooltip="expand row">
      <TableBodyExpandCellButton onClick={onClick} isExpanded={isExpanded} />
    </TableBodyCell>
  );
}

TableBodyExpandCell.propTypes = {
  onClick: PropTypes.func,
  isExpanded: PropTypes.bool
};

TableBodyExpandCell.defaultProps = {
  onClick: () => {},
  isExpanded: false
};

export default TableBodyExpandCell;
