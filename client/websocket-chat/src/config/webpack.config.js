const path = require('path');

module.exports = {
    resolve: {
        fallback: {
            http: require.resolve("stream-http"),
            https: require.resolve("https-browserify"),
            os: require.resolve("os-browserify/browser"),
            buffer: require.resolve("buffer/"),
            stream: require.resolve("stream-browserify"),
        }
    }
};
