import React from 'react';
import PropTypes from 'prop-types';

import TableBodyCell from './TableBodyCell';

function TableBodyRow({ idx, columns, rowData }) {
  return (
    <tr>
      {columns.map(({ key, dataTooltip }) => {
        const cellData = rowData[key];
        return (
          <TableBodyCell
            key={`${idx}_tbody_tr_${key}_td`}
            cellData={cellData}
            tooltip={dataTooltip ? dataTooltip(cellData, rowData) : null}
          />
        );
      })}
    </tr>
  );
}

TableBodyRow.propTypes = {
  idx: PropTypes.number.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      title: PropTypes.node,
      titleTooltip: PropTypes.string,
      width: PropTypes.number
    })
  ),
  rowData: PropTypes.object
};

TableBodyRow.defaultProps = {
  columns: [],
  rowData: {}
};

export default TableBodyRow;
