import React from 'react';
import PropTypes from 'prop-types';

function TableBodyExpandedRow({ children, columnsCount }) {
  return (
    <tr className="expanded-table-row">
      <td className="table-body-expanded-row-empty-td" />
      <td colSpan={columnsCount}>{children}</td>
    </tr>
  );
}

TableBodyExpandedRow.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  columnsCount: PropTypes.number
};

TableBodyExpandedRow.defaultProps = {
  columnsCount: 1
};

export default TableBodyExpandedRow;
