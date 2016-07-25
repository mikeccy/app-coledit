module.exports = {
  entry: {
    workspace: "../src/app/workspace/Entry.js",
  },
  output: {
    filename: '../public/build/[name].entry.chunk.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          plugins: [
            'transform-react-constant-elements',
            'transform-react-inline-elements',
            // 'transform-runtime' should do as little as possible.
            ['transform-runtime', { polyfill: false, regenerator: false }],
            'add-module-exports',
          ],
          presets: ['es2015', 'react', 'stage-1'],
        }
      }
    ],
    resolve: {
      extensions: ['', '.js', '.jsx']
    }
  }
};
