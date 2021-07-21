module.exports = () => [
  {
    test: /\.(wav|mp3)$/,
    loader: 'file-loader',
    options: {
    name: '[name].[ext]',
    },
  },
];
