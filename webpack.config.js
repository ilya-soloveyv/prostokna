require('dotenv').config();

const path = require('path');
const fs = require('fs');

const webpack = require('webpack');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const TerserPlugin = require('terser-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const NodemonPlugin = require('nodemon-webpack-plugin');

const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = !isDevelopment;

const plugins = function getPluginsArray() {
  const base = [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      axios: 'axios',
      Popper: '@popperjs/core',
    }),
    new CleanWebpackPlugin(),
    new CopyPlugin({ patterns: ['./images/**/*'] }),
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({ filename: '[name].[fullhash].css' }),
    new BuildHashPlugin({ filename: './static/build-hash.json' }),
    new VueLoaderPlugin(),
    new NodemonPlugin({
      script: './app.js',
      watch: [path.resolve('./static'), path.resolve('./app.js')],
      delay: '1000',
    }),
  ];

  if (isProduction) base.push(new BundleAnalyzerPlugin());

  return base;
};

class BuildHashPlugin {
  constructor(options) {
    this.options = { filename: 'build-hash.json', ...options };
  }

  apply(compiler) {
    compiler.hooks.done.tap(this.constructor.name, (stats) => {
      const json = JSON.stringify(stats.hash);
      return new Promise((resolve, reject) => {
        fs.writeFile(this.options.filename, json, 'utf8', (error) => {
          if (error) {
            reject(error);
            return;
          }
          resolve();
        });
      });
    });
  }
}

module.exports = {
  mode: 'development',

  context: path.resolve(__dirname, 'src'),
  entry: {
    legacy: {
      import: './legacy.js',
      dependOn: 'common.legacy',
    },
    'index.legacy': {
      import: './index.legacy.js',
      dependOn: 'common.legacy',
    },
    'common.legacy': {
      import: './common.legacy.js',
    },
    'admin/admin': {
      import: './admin/js/admin.js',
    },
  },

  devServer: {
    stats: 'errors-only',
    host: '0.0.0.0',
    port: 4000,
    contentBase: [path.join(__dirname, 'src')],
    watchContentBase: true,
    useLocalIp: true,
    overlay: true,
    hot: true,
  },

  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@vendor': path.resolve(__dirname, 'src/vendor'),
      '@images': path.resolve(__dirname, 'src/images'),
      '@scss': path.resolve(__dirname, 'src/assets/scss'),
      vue: 'vue/dist/vue.js',
    },
  },

  devtool: isDevelopment ? 'source-map' : false,

  plugins: plugins(),

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.(png|jpg|jpeg|gif|woff|woff2|eot|ttf|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: '[path][name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDevelopment,
              reloadAll: true,
            },
          },
          {
            loader: 'css-loader',

            options: {
              import: true,
              sourceMap: isDevelopment,
            },
          },
          {
            loader: 'sass-loader',

            options: {
              sourceMap: isDevelopment,
            },
          },
        ],
      },
    ],
  },

  output: {
    filename: '[name].[fullhash].js',
    path: path.resolve(__dirname, 'static'),
    publicPath: '/',
  },

  optimization: {
    minimizer: [new TerserPlugin()],

    splitChunks: {
      cacheGroups: {
        defaultVendors: {
          priority: -10,
          test: /[\\/]node_modules[\\/]/,
        },
      },

      chunks: 'async',
      minChunks: 1,
      minSize: 30000,
      name: false,
    },
  },
};
