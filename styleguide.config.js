const path = require('path');

module.exports = {
  title: 'aw-table',
  components: 'src/Table.jsx',
  styleguideComponents: {
    StyleGuideRenderer: path.join(__dirname, 'lib/styleguide/StyleGuideRenderer')
  }
};
