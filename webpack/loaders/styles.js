const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = ({ localIdentName, isProduction }) => [
  {
    test: /\.styl$/,
    use: [
      { loader: isProduction ? MiniCssExtractPlugin.loader : 'style-loader' },
      {
        loader: 'css-loader',
        options: {
          modules: {
            localIdentName,
          },
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            config: path.resolve(__dirname, '../../postcss.config.js'),
          },
        },
      },
      { loader: 'stylus-loader' },
    ],
  },
  {
    test: /\.css$/,
    use: ['style-loader', 'css-loader'],
  },
];
