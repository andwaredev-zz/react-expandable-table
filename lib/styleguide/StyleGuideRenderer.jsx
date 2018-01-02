import React from 'react';
import PropTypes from 'prop-types';

export function StyleGuideRenderer({ children }) {
  return <div style={{ margin: '24px 36px' }}>{children}</div>;
}

StyleGuideRenderer.propTypes = {
  children: PropTypes.node.isRequired
};

export default StyleGuideRenderer;
