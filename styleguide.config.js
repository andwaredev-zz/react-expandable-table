const path = require('path');

module.exports = {
  title: 'react-expandable-table',
  components: 'src/Table.jsx',
  styleguideComponents: {
    StyleGuideRenderer: path.join(__dirname, 'lib/styleguide/StyleGuideRenderer')
  }
};
