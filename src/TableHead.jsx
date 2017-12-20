import React from 'react';
import PropTypes from 'prop-types';

import TableCell from './TableCell';
import { getTotalWidth } from './tableUtil';

export const expandCellWidth = '50px';

function TableHead({ cells, isExpandable }) {
  const totalWidth = getTotalWidth(cells);

  return (
    <thead className="table-head">
      <tr className="table-head-row">
        {isExpandable && (
          <th className="expand-th" key="expandable_thead_th" style={{ width: expandCellWidth }}>
            <TableCell />
          </th>
        )}
        {cells.map(({ key, title, titleTooltip, width }) => (
          <th key={`${key}_thead_th`} style={{ width: `calc(${width * 100 / totalWidth}% - ${expandCellWidth})` }}>
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
   * Is this table an expandable table?
   * If true, renders an empty th first in the leftmost column
   */
  isExpandable: PropTypes.bool
};

TableHead.defaultProps = {
  cells: [],
  isExpandable: false
};

export default TableHead;
