import React from 'react';
import PropTypes from 'prop-types';

import TableBodyCell from './TableBodyCell';
import TableBodyExpandCellButton from './TableBodyExpandCellButton';

function TableBodyExpandCell({ onClick, isExpanded, expandButtonRender }) {
  return (
    <TableBodyCell className="expandable-table-body-cell" tooltip="expand row">
      {expandButtonRender && typeof expandButtonRender === 'function' ? (
        expandButtonRender({ isExpanded, onClick })
      ) : (
        <TableBodyExpandCellButton onClick={onClick} isExpanded={isExpanded} />
      )}
    </TableBodyCell>
  );
}

TableBodyExpandCell.propTypes = {
  onClick: PropTypes.func,
  expandButtonRender: PropTypes.func,
  isExpanded: PropTypes.bool
};

TableBodyExpandCell.defaultProps = {
  onClick: () => {},
  isExpanded: false
};

export default TableBodyExpandCell;
