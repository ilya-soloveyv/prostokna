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

const serverPort = process.env.PORT || 3002;
const devServerPort = process.env.DEV_SERVER_PORT || 3000;

const plugins = function getPluginsArray() {
  const base = [
    new CleanWebpackPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      axios: 'axios',
      Popper: '@popperjs/core'
    }),

    new CopyPlugin({
      patterns: ['./images/**/*', './*.html', './assets/fonts/*', './admin/fonts/*']
    }),
    new MiniCssExtractPlugin({ filename: '[name].[fullhash].css' }),
    new BuildHashPlugin({ filename: './static/build-hash.json' }),
    new VueLoaderPlugin(),
    new NodemonPlugin({
      script: './app.js',
      watch: [
        path.resolve('./static/build-hash.json'),
        path.resolve('./routes'),
        path.resolve('./models'),
        path.resolve('./app.js')
      ],
      delay: '1000'
    }),
    new webpack.ProgressPlugin()
  ];

  if (isDevelopment) base.push(new webpack.HotModuleReplacementPlugin());
  if (isProduction) base.push(new BundleAnalyzerPlugin());

  return base;
};

class BuildHashPlugin {
  constructor(options) {
    this.options = { filename: 'build-hash.json', ...options };
  }

  apply(compiler) {
    compiler.hooks.done.tap(this.constructor.name, stats => {
      const json = JSON.stringify(stats.hash);
      return new Promise((resolve, reject) => {
        fs.writeFile(this.options.filename, json, 'utf8', error => {
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
    /**
     * Common
     */
    'common.legacy': './common.legacy.js',

    /**
     * Legacy entrypoints
     */
    legacy: {
      import: './legacy.js',
      dependOn: 'common.legacy'
    },
    'index.legacy': {
      import: './index.legacy.js',
      dependOn: 'common.legacy'
    },

    /**
     * New entrypoints
     */
    configurator: {
      import: './configurator.js',
      dependOn: 'common.legacy'
    },

    /**
     * Admin panel
     */
    'admin/admin': {
      import: './admin/js/admin.js'
    }
  },

  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@vendor': path.resolve(__dirname, 'src/vendor'),
      '@images': path.resolve(__dirname, 'src/images'),
      '@scss': path.resolve(__dirname, 'src/assets/scss'),
      vue: 'vue/dist/vue.js'
    }
  },

  devtool: isDevelopment ? 'source-map' : false,

  plugins: plugins(),

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(png|jpg|jpeg|gif|woff|woff2|eot|ttf|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: '[path][name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDevelopment
            }
          },
          {
            loader: 'css-loader',

            options: {
              import: true,
              sourceMap: isDevelopment
            }
          },
          {
            loader: 'sass-loader',

            options: {
              sourceMap: isDevelopment
            }
          }
        ]
      }
    ]
  },

  output: {
    filename: '[name].[fullhash].js',
    path: path.resolve(__dirname, 'static'),
    publicPath: '/'
  },

  optimization: {
    minimizer: [new TerserPlugin()],

    splitChunks: {
      cacheGroups: {
        defaultVendors: {
          priority: -10,
          test: /[\\/]node_modules[\\/]/
        }
      }
    }
  }

  // TODO: HMR обновляет страницу, но сервер отдает файлы с кодом 304
  // devServer: {
  //   index: '',
  //   stats: 'errors-only',
  //   host: '0.0.0.0',
  //   port: devServerPort,
  //   proxy: [
  //     {
  //       context: path => !/\.(js|css|map)$/.test(path),
  //       target: `http://localhost:${serverPort}`,
  //       changeOrigin: true
  //     }
  //   ],
  //   contentBase: [path.join(__dirname, 'src')],
  //   watchContentBase: true,
  //   useLocalIp: true,
  //   hot: true
  // },
};
