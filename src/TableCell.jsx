import React from 'react';
import PropTypes from 'prop-types';

import TooltipWrapper from './TooltipWrapper';

function TableCell({ children, tooltip }) {
  return (
    <div className="table-cell">
      <TooltipWrapper tooltip={tooltip}>{children}</TooltipWrapper>
    </div>
  );
}

TableCell.propTypes = {
  children: PropTypes.node,
  tooltip: PropTypes.string
};

TableCell.defaultProps = {
  children: null,
  tooltip: null
};

export default TableCell;
