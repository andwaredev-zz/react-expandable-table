import React from 'react';
import PropTypes from 'prop-types';

import { parseString } from './tableUtil';

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

    const parsedChildren = parseString(children);
    if (parsedChildren) {
      return parsedChildren;
    }

    if (Array.isArray(children)) {
      const parsedChild = parseString(children[0]);
      if (parsedChild) {
        return parsedChild;
      }
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
