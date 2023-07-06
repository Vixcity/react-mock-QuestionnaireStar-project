/* eslint-disable no-undef */
module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://0.0.0.0:3001",
        secure: false,
        changeOrigin: true,
        logLevel: "debug",
      },
    },
  },
};
