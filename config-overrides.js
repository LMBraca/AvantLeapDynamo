module.exports = function override(config) {
  // Add fallbacks for node core modules
  config.resolve.fallback = {
    ...config.resolve.fallback,
    crypto: require.resolve("crypto-browserify"),
    stream: require.resolve("stream-browserify"),
    util: require.resolve("util/"),
    buffer: require.resolve("buffer/"),
    process: require.resolve("process/browser"),
    vm: require.resolve("vm-browserify"),
  };

  return config;
};
