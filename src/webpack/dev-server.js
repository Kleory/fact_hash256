const path = require('path');

module.exports = function () {
  return {
    devServer: {
      contentBase: path.resolve(process.cwd(), 'build'),
      compress: true,
      historyApiFallback: true,
      host: '0.0.0.0',
      disableHostCheck: true,
      port: 3000,
      writeToDisk: true,
    },
  };
};
