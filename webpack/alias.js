const path = require('path');

module.exports = () => ({
  alias: {
    '~components': path.resolve('./src/components'),
    '~blocks': path.resolve('./src/blocks'),
    '~pages': path.resolve('./src/pages'),
    '~config': path.resolve('./src/config'),
    '~layouts': path.resolve('./src/layouts'),
    '~routes': path.resolve('./src/routes'),
    '~utils': path.resolve('./src/utils'),
    '~constants': path.resolve('./src/constants'),
    '~stores': path.resolve('./src/stores'),
    '~assets': path.resolve('./src/assets'),
    '~stylesheets': path.resolve('./src/stylesheets'),
    '~': path.resolve('./src'),
  },
});
