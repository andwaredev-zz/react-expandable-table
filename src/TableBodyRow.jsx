import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import TableBodyCell from './TableBodyCell';

class TableBodyRow extends React.Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { idx, onClick, rowData } = this.props;

    if (onClick) {
      onClick(rowData, idx);
    }
  }

  render() {
    const { idx, columns, onClick, rowData } = this.props;

    return (
      <tr className={classNames('table-row', { clickable: !!onClick })} onClick={this.handleClick}>
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
  /**
   * Function to be invoked when a row is clicked
   *
   * (rowData, rowIndex) => void
   */
  onClick: PropTypes.func,
  rowData: PropTypes.object
};

TableBodyRow.defaultProps = {
  columns: [],
  rowData: {}
};

export default TableBodyRow;
