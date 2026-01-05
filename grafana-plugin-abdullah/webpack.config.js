const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/module.ts',
  output: {
    filename: 'module.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'amd',
  },
  externals: [
    'lodash',
    'moment',
    'slate',
    'slate-react',
    'prismjs',
    '@grafana/data',
    '@grafana/ui',
    '@grafana/runtime',
    'react',
    'react-dom',
    'react-redux',
    'redux',
    '@emotion/react',
    '@emotion/styled',
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
};
