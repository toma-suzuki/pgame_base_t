
const path = require('path');
const webpak = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const CopyTargets = require('./copy-target.config.dev');

const OUT_PATH = 'build_dev';



module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: 'development',

  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: [
    './src/main.ts',
    '@babel/polyfill',
  ],
  // ファイルの出力設定
  output: {
    //  出力ファイルのディレクトリ名
    path: path.resolve(__dirname, '../', OUT_PATH, 'jsgame'),
    // 出力ファイル名
    filename: 'pgame.js',
    publicPath:  path.resolve(__dirname, '../')
  },
  module: {
    rules: [
      {
        test: /\.(gif|png|jpe?g|svg|eot|wof|woff|ttf|mp3|wav|mp4)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: './static/assets/',
              publicPath: './static/assets',
              name: '[name].[ext]?[contenthash]',
            },
          },
        ],
      },
      {
        // 拡張子 .ts の場合
        test: /\.ts$/,
        // 1. TypeScript をコンパイルする
        // 2. Babel して IE 対応
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
              ]
            },
          },
          {
            loader: 'ts-loader',
          }
        ],
      },
    ]
  },
  // import 文で .ts ファイルを解決するため
  resolve: {
    extensions: [
      '.ts',
      '.js'
    ],
  },
  // プラグイン
  plugins: [
    new CopyWebpackPlugin([
      {
        context: 'public',
        from: '',
        to: path.resolve(__dirname, '../', OUT_PATH),
      },
      // ./copy-target.config.js から動的にコピー
      ...CopyTargets.map((v) => ({
        from: path.resolve(__dirname, '../', v.from),
        to: path.resolve(__dirname, '../', OUT_PATH, v.to),
        context: path.resolve(__dirname, '../', v.context),
      })),
    ]),
    new webpak.EnvironmentPlugin({
      BUILD_MODE: JSON.stringify('dev'),
    }),
  ],
  // webpack-dev-server
  devServer: {
    contentBase: path.resolve(__dirname, '../', OUT_PATH),
    watchContentBase: true,
    port: 3000,
    hot: true
  }
};
