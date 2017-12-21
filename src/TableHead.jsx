import React from 'react';
import PropTypes from 'prop-types';

import TableCell from './TableCell';
import { getTotalWidth } from './tableUtil';

function TableHead({ cells, expandCellWidth, isExpandable }) {
  const totalWidth = getTotalWidth(cells);

  return (
    <thead className="table-head">
      <tr className="table-head-row">
        {isExpandable && (
          <th className="expand-th" key="expandable_thead_th" style={{ width: `${expandCellWidth}px` }}>
            <TableCell />
          </th>
        )}
        {cells.map(({ key, title, titleTooltip, width }) => (
          <th key={`${key}_thead_th`} style={{ width: `calc(${width * 100 / totalWidth}% - ${expandCellWidth}px)` }}>
            <TableCell tooltip={titleTooltip}>{title}</TableCell>
          </th>
        ))}
      </tr>
    </thead>
  );
}

TableHead.propTypes = {
  cells: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      title: PropTypes.node,
      titleTooltip: PropTypes.string,
      width: PropTypes.number
    })
  ),
  /**
   * The [fixed] width (in pixels) of the expand row button cell.
   */
  expandCellWidth: PropTypes.number,
  /**
   * Is this table an expandable table?
   * If true, renders an empty th first in the leftmost column
   */
  isExpandable: PropTypes.bool
};

TableHead.defaultProps = {
  cells: [],
  expandCellWidth: 50,
  isExpandable: false
};

export default TableHead;
