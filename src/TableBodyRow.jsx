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
        {columns.map(({ key, dataTooltip, render }) => {
          const cellData = rowData[key];
          return (
            <TableBodyCell
              key={`${idx}_tbody_tr_${key}_td`}
              cellData={cellData}
              tooltip={dataTooltip && typeof dataTooltip === 'function' ? dataTooltip(cellData, rowData) : cellData}
            >
              {render && typeof render === 'function' && render(cellData, rowData, idx)}
            </TableBodyCell>
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
      /**
       * Function to generate a custom tooltip string for the specific data cell.
       * If not provided, the tooltip will default to cellData, if it can be parsed into a string.
       *
       * `Function(cellData, rowData):string`
       */
      dataTooltip: PropTypes.func,
      /**
       * Optional custom render to be used for the column data cell.
       *
       * `Function(cellData, rowData, rowIndex):ReactNode|[ReactNode]`
       */
      render: PropTypes.func,
      /**
       * Optional custom node to be used for the column title.
       */
      title: PropTypes.node,
      /**
       * Optional tooltip for the column's title (th), defaults to `column.title` (if string parsable)
       */
      titleTooltip: PropTypes.string,
      /**
       * Optional number to be used to represent what percentage of the total width this column should span.
       * Similar to the css `flex-grow` property.
       */
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
