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
    const { columns, dataSource, isBordered, onRowClick, onRowExpand } = this.props;

    return (
      <div className={classNames('react-table', { bordered: isBordered })}>
        <table>
          <TableHead cells={this.getTableHeadCells()} isExpandable={!!onRowExpand} />
          <TableBody columns={columns} dataSource={dataSource} onRowClick={onRowClick} onRowExpand={onRowExpand} />
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
       * (cellData, rowData) => string
       */
      dataTooltip: PropTypes.func,
      title: PropTypes.node,
      /**
       * Optional tooltip for the column's title (th), defaults to column.title (if string)
       */
      titleTooltip: PropTypes.string,
      width: PropTypes.number
    })
  ),
  dataSource: PropTypes.arrayOf(PropTypes.object),
  isBordered: PropTypes.bool,
  /**
   * Function to be invoked when a row is clicked
   *
   * Function(rowData, rowIndex):void
   */
  onRowClick: PropTypes.func,
  /**
   * Function to be invoked when a row expand icon is clicked
   * The expand icon will be included by default if you provide a onRowExpand function
   *
   * Function(rowData, rowIndex):ReactNode|[ReactNode]
   */
  onRowExpand: PropTypes.func
};

Table.defaultProps = {
  columns: [],
  dataSource: [],
  isBordered: false
};

export default Table;
