import React from 'react';
import PropTypes from 'prop-types';

import TableBodyEmpty from './TableBodyEmpty';
import TableBodyRow from './TableBodyRow';
import TableBodyExpandedRow from './TableBodyExpandedRow';

class TableBody extends React.Component {
  constructor() {
    super();

    this.toggleRowExpand = this.toggleRowExpand.bind(this);

    this.state = {
      expandedRowIndices: {}
    };
  }

  toggleRowExpand(idx) {
    this.setState(prevState => {
      const { expandedRowIndices = {} } = prevState;
      expandedRowIndices[idx] = !expandedRowIndices[idx];
      return { expandedRowIndices };
    });
  }

  render() {
    const { columns, dataSource, emptyText, expandButtonRender, onRowClick, onRowExpand } = this.props;
    const { expandedRowIndices } = this.state;

    if (dataSource.length < 1) {
      return <TableBodyEmpty columnsCount={columns.length} text={emptyText} />;
    }

    return (
      <tbody className="table-body">
        {dataSource.map((rowData, idx) => {
          const isExpanded = expandedRowIndices[idx];

          return [
            <TableBodyRow
              key={idx}
              idx={idx}
              columns={columns}
              isExpandable={!!onRowExpand}
              isExpanded={isExpanded}
              expandButtonRender={expandButtonRender}
              onClick={onRowClick}
              onExpandClick={this.toggleRowExpand}
              rowData={rowData}
            />,
            isExpanded ? (
              <TableBodyExpandedRow key={`${idx}-expanded-row`} columnsCount={columns.length}>
                {onRowExpand(rowData, idx)}
              </TableBodyExpandedRow>
            ) : null
          ];
        })}
      </tbody>
    );
  }
}

TableBody.propTypes = {
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

TableBody.defaultProps = {
  columns: [],
  dataSource: [],
  emptyText: 'No Data'
};

export default TableBody;
