const path = require('path');

module.exports = {
  resolve: {
    fallback: {
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "path": require.resolve("path-browserify"),
      "url": require.resolve("url/"),
      "querystring": require.resolve("querystring-es3"),
      "fs": false, // 'fs' is for server-side, disable it for client-side
    },
  },
};
