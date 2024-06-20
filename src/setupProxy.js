import proxy from 'http-proxy-middleware';

export default function (app) {
  app.use(
    '/api',
    proxy({
      target: 'http://localhost:8000',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/', // remove '/api' prefix when proxying
      },
    })
  );
}
