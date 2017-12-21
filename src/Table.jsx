import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import TableBody from './TableBody';
import TableHead from './TableHead';

import './Table.scss';

class Table extends React.Component {
  constructor() {
    super();

    this.getTableHeadCells = this.getTableHeadCells.bind(this);
  }

  getTableHeadCells() {
    return this.props.columns.map(({ key, title, titleTooltip, width }) => ({
      key,
      title,
      titleTooltip,
      width
    }));
  }

  render() {
    const { columns, dataSource, emptyText, expandButtonRender, isBordered, onRowClick, onRowExpand } = this.props;

    return (
      <div className={classNames('react-table', { bordered: isBordered })}>
        <table>
          <TableHead cells={this.getTableHeadCells()} isExpandable={!!onRowExpand} />
          <TableBody
            columns={columns}
            dataSource={dataSource}
            emptyText={emptyText}
            expandButtonRender={expandButtonRender}
            onRowClick={onRowClick}
            onRowExpand={onRowExpand}
          />
        </table>
      </div>
    );
  }
}

Table.propTypes = {
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
   * An array of objects, each containing key-value pairs, where the keys correspond to column keys
   */
  dataSource: PropTypes.arrayOf(PropTypes.object),
  /**
   * Text to be displayed when dataSource is empty or undefined
   */
  emptyText: PropTypes.string,
  /**
   * Optional custom render to be used for the row expand button.
   * Make sure your custom node calls the provided `onClick` function.
   * Optionally, you can also use the provided `isExpanded` boolean if you'd like to conditionally render based on the current row's `isExpanded` state
   *
   * Function({ onClick, isExpanded }):ReactNode|[ReactNode]
   */
  expandButtonRender: PropTypes.func,
  /**
   * If true, the table will be styled with borders.
   */
  isBordered: PropTypes.bool,
  /**
   * Function to be invoked when a row is clicked.
   *
   * `Function(rowData, rowIndex):void`
   */
  onRowClick: PropTypes.func,
  /**
   * Function to be invoked when a row expand icon is clicked
   * The expand icon will be included by default if you provide an `onRowExpand` function.
   *
   * `Function(rowData, rowIndex):ReactNode|[ReactNode]`
   */
  onRowExpand: PropTypes.func
};

Table.defaultProps = {
  columns: [],
  dataSource: [],
  emptyText: 'No Data',
  isBordered: false
};

export default Table;
