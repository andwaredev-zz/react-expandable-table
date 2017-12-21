const path = require('path');

module.exports = {
  components: 'src/Table.jsx',
  styleguideComponents: {
    StyleGuideRenderer: path.join(__dirname, 'lib/styleguide/StyleGuideRenderer')
  }
};
