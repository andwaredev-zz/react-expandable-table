import React from 'react';
import PropTypes from 'prop-types';

class TooltipWrapper extends React.Component {
  constructor() {
    super();

    this.getTitle = this.getTitle.bind(this);
  }

  getTitle() {
    const { children, tooltip } = this.props;

    if (tooltip) {
      return tooltip;
    }

    if (typeof children === 'string') {
      return children;
    }

    return undefined;
  }

  render() {
    const { children } = this.props;

    return <div title={this.getTitle()}>{children}</div>;
  }
}

TooltipWrapper.propTypes = {
  children: PropTypes.node,
  tooltip: PropTypes.string
};

TooltipWrapper.defaultProps = {
  children: null,
  tooltip: null
};

export default TooltipWrapper;
