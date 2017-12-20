import React from 'react';
import PropTypes from 'prop-types';

function TableBodyExpandCellButton({ onClick }) {
  return (
    <button className="table-body-expand-cell-button" onClick={onClick}>
      +
    </button>
  );
}

TableBodyExpandCellButton.propTypes = {
  onClick: PropTypes.func
};

TableBodyExpandCellButton.defaultProps = {
  onClick: () => {}
};

export default TableBodyExpandCellButton;
