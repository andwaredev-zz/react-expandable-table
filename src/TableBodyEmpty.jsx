import React from 'react';
import PropTypes from 'prop-types';

function TableBodyEmpty({ columnsCount, text }) {
  return (
    <tbody className="tbody-empty">
      <tr>
        <td colSpan={columnsCount}>{text}</td>
      </tr>
    </tbody>
  );
}

TableBodyEmpty.propTypes = {
  columnsCount: PropTypes.number,
  text: PropTypes.string
};

TableBodyEmpty.defaultProps = {
  columnsCount: 1
};

export default TableBodyEmpty;
