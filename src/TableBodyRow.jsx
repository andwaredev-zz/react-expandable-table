import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import TableBodyCell from './TableBodyCell';
import TableBodyExpandCell from './TableBodyExpandCell';
import { stopPropagation } from './tableUtil';

class TableBodyRow extends React.Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
    this.handleExpandClick = this.handleExpandClick.bind(this);
  }

  handleClick(e) {
    stopPropagation(e);
    const { idx, onClick, rowData } = this.props;

    if (onClick) {
      onClick(rowData, idx);
    }
  }

  handleExpandClick(e) {
    stopPropagation(e);
    const { idx, onExpandClick } = this.props;

    if (onExpandClick) {
      onExpandClick(idx);
    }
  }

  render() {
    const { columns, idx, isExpandable, isExpanded, onClick, rowData } = this.props;

    return (
      <tr
        className={classNames('table-row', { clickable: !!onClick, expandable: isExpandable, expanded: isExpanded })}
        onClick={this.handleClick}
      >
        {isExpandable && <TableBodyExpandCell onClick={this.handleExpandClick} isExpanded={isExpanded} />}
        {columns.map(({ key, dataTooltip }) => {
          const cellData = rowData[key];
          return (
            <TableBodyCell
              key={`${idx}_tbody_tr_${key}_td`}
              cellData={cellData}
              tooltip={dataTooltip ? dataTooltip(cellData, rowData) : undefined}
            />
          );
        })}
      </tr>
    );
  }
}

TableBodyRow.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      title: PropTypes.node,
      titleTooltip: PropTypes.string,
      width: PropTypes.number
    })
  ),
  /**
   * The row index
   */
  idx: PropTypes.number.isRequired,
  /**
   * Whether or no the table is an expandable table
   */
  isExpandable: PropTypes.bool,
  /**
   * Whether or not the row is currently expanded
   */
  isExpanded: PropTypes.bool,
  /**
   * Function to be invoked when a row is clicked
   *
   * Function(rowData, rowIndex):void
   */
  onClick: PropTypes.func,
  /**
   * Function to be invoked upon clicking the row expand
   *
   * Function(rowIndex):void
   */
  onExpandClick: PropTypes.func,
  rowData: PropTypes.object
};

TableBodyRow.defaultProps = {
  columns: [],
  isExpandable: false,
  isExpanded: false,
  rowData: {}
};

export default TableBodyRow;
