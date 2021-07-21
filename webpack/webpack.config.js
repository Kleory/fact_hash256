const path = require('path');

const javascriptLoaders = require('./loaders/javascript');
const stylesLoaders = require('./loaders/styles');
const imagesLoaders = require('./loaders/images');
const fontsLoaders = require('./loaders/fonts');
const audioLoaders = require('./loaders/audio');

const alias = require('./alias');

const devServer = require('./dev-server');
const plugins = require('./plugins');

module.exports = (env, argv) => {
  const { mode } = argv;

  const isProduction = mode === 'production';
  const productionName = '[hash:base64:5]';
  const devName = '[folder]_[local]';

  const localIdentName = isProduction ? productionName : devName;

  const config = {
    isProduction,
    localIdentName,
  };

  return {
    entry: {
      main: './src/app.js',
    },
    output: {
      path: path.resolve(__dirname, '../build'),
      filename: '[name].[hash].js',
      publicPath: '/',
    },
    resolve: {
      ...alias(),
    },
    module: {
      rules: [
        ...javascriptLoaders(config),
        ...stylesLoaders(config),
        ...imagesLoaders(config),
        ...fontsLoaders(config),
        ...audioLoaders(config),
      ],
    },
    ...plugins(config),
    ...devServer(config),
  };
};
