const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
  name: 'word-relay-dev',
  mode: 'development',  // 실서비스 : production
  devtool: 'inline-source-map',
  resolve: {  // entry > app의 'client.js', 'client.jsx'를 찾아줌 (확장자 생략용)
    extensions: ['.js', '.jsx'],
  },
  entry: {  // 웹팩 설정 입력
    // app: ['./client.jsx', './client.js', './csafwf.css', './qwmrkqr.json'],
    app: './client',
  },
  module: {
    rules: [{
      test: /\.jsx?$/,        // 바벨 적용
      loader: 'babel-loader', // 바벨 적용
      options: {
        presets: [
          ['@babel/preset-env', {
            targets: {browsers: ['last 2 chrome versions']},
            debug: true,
          }],
          '@babel/preset-react',
        ],
        plugins: ['react-refresh/babel'],
      },
      exclude: path.join(__dirname, 'node_modules'),
    }],
  },
  plugins: [
    new ReactRefreshWebpackPlugin(),
  ],
  output: { // 웹팩 설정 출력
    path: path.join(__dirname, 'dist'),
    // filename: '[name].js',
    filename: 'app.js',
    publicPath: '/dist',
  },
  devServer: {
    devMiddleware: { publicPath: '/dist' },
    static: { directory: path.resolve(__dirname) },
    hot: true
  }
};
