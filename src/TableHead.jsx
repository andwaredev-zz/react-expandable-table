import React from 'react';
import PropTypes from 'prop-types';

import TableCell from './TableCell';
import { getTotalWidth } from './tableUtil';

function TableHead({ cells }) {
  const totalWidth = getTotalWidth(cells);

  return (
    <thead>
      <tr>
        {cells.map(({ key, title, titleTooltip, width }) => (
          <th key={`${key}_thead_th`}>
            <TableCell style={{ width: `${width * 100 / totalWidth}%` }} tooltip={titleTooltip}>
              {title}
            </TableCell>
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
  )
};

TableHead.defaultProps = {
  cells: []
};

export default TableHead;
