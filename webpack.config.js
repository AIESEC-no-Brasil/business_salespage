const webpack = require("webpack");
const path = require("path");
const BabiliPlugin = require("babili-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');


const extractSass = new ExtractTextPlugin({
  filename: "style.css"
});

const optimizeCssPlugin = new OptimizeCssAssetsPlugin({
  assetNameRegExp: /\.css$/g,
  cssProcessor: require("cssnano"),
  cssProcessorOptions: { discardComments: { removeAll: true } },
  canPrint: true
});

const plugins = [];
plugins.push(extractSass);
plugins.push(
  new HtmlWebpackPlugin({
    title: "Business Blog",
    filename: "index.html",
    template: "main.html",
    minify: {
      removeComments: true
    }
  })
);
plugins.push(new CopyWebpackPlugin([{ from: "src/assets/imgs", to: "images" }]));
if (process.env.NODE_ENV === "production") {
  plugins.push(new webpack.optimize.AggressiveMergingPlugin()); //Merge chunks
  plugins.push(new BabiliPlugin());
  plugins.push(optimizeCssPlugin);
  plugins.push(new webpack.optimize.ModuleConcatenationPlugin());
}

module.exports = {
  entry: {
    app: "./src/index.js"
  },
  output: {
    filename: "business.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.sass|\.scss|\.css$/,
        use: extractSass.extract({
          use: [
            {
              loader: "css-loader"
            },
            {
              loader: "sass-loader"
            }
          ],
          fallback: "style-loader"
        })
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "./images/[hash].[ext]"
            }
          }
        ]
      }
    ]
  },
  plugins
};
