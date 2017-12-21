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
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
  tooltip: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool])
};

export default TableCell;
