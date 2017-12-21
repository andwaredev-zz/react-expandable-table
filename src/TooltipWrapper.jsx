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
      return parseString(tooltip);
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

    const parsedChildren =
      typeof children === 'boolean' || typeof children === 'number' ? parseString(children) : children;

    return <div title={this.getTitle()}>{parsedChildren}</div>;
  }
}

TooltipWrapper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
  tooltip: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool])
};

export default TooltipWrapper;
