const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://104.197.90.87:5000',
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        '^/api': '',
      },
    })
  );
};