const {
  override,
  addWebpackAlias,
  addBabelPlugin,
  addWebpackPlugin,
} = require("customize-cra");
const TerserPlugin = require("terser-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const path = require("path");
const { PurgeCSSPlugin } = require("purgecss-webpack-plugin");
const glob = require("glob");

module.exports = override(
  // Add webpack aliases for easier module imports
  addWebpackAlias({
    "@components": path.resolve(__dirname, "src/components"),
    // Add more aliases as needed
  }),

  // Add Babel plugin for optimization
  addBabelPlugin(["@babel/plugin-transform-runtime"]),

  // Add TerserPlugin for minification
  addWebpackPlugin(
    new TerserPlugin({
      terserOptions: {
        // More options for Terser: https://github.com/terser/terser#minify-options
        compress: {
          drop_console: true, // Drop console.log statements
        },
      },
    })
  ),

  // Add CompressionPlugin for Gzip compression
  addWebpackPlugin(
    new CompressionPlugin({
      filename: "[path][base].gz",
      algorithm: "gzip",
      test: /\.(js|css|html|svg)$/,
      threshold: 10240, // Only assets bigger than 10 KB are compressed
      minRatio: 0.8, // Only assets that compress better than 80% are compressed
    })
  ),

  // Add PurgeCSSPlugin to remove unused CSS
  addWebpackPlugin(
    new PurgeCSSPlugin({
      paths: glob.sync(`src/**/*`, { nodir: true }),
    })
  ),

  //   // Add Webpack Bundle Analyzer to analyze JavaScript bundle
  //   addWebpackPlugin(new BundleAnalyzerPlugin()),

  // Optionally, add other webpack optimizations
  (config) => {
    // Example: Disable splitting and use a single runtime chunk
    config.optimization.splitChunks = false;
    config.optimization.runtimeChunk = false;

    return config;
  }
);
