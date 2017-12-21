import React from 'react';
import PropTypes from 'prop-types';

function TableBodyExpandCellButton({ onClick, isExpanded }) {
  return (
    <button className="table-body-expand-cell-button" onClick={onClick}>
      {isExpanded ? '-' : '+'}
    </button>
  );
}

TableBodyExpandCellButton.propTypes = {
  onClick: PropTypes.func,
  isExpanded: PropTypes.bool
};

TableBodyExpandCellButton.defaultProps = {
  onClick: () => {},
  isExpanded: false
};

export default TableBodyExpandCellButton;
