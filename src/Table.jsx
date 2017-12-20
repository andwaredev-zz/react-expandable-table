import React from 'react';
import PropTypes from 'prop-types';

import TableBody from './TableBody';
import TableHead from './TableHead';

import './Table.css';

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
    const { columns, dataSource } = this.props;

    return (
      <div>
        <table>
          <TableHead cells={this.getTableHeadCells()} />
          <TableBody columns={columns} dataSource={dataSource} />
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
       * Function to generate a custom tooltip string for the specific data cell
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
  dataSource: PropTypes.arrayOf(PropTypes.object)
};

Table.defaultProps = {
  columns: [],
  dataSource: []
};

export default Table;
