const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');
const withImages = require('next-images');

module.exports = withCSS(
  withSass(
    withImages({
      env: {
        APP_TITLE: ' | Umana admin',
        APP_CLOUDINARY: 'https://api.cloudinary.com/v1_1/umana-storage',
        APP_ENV: 'production',
        // API_URL: 'http://localhost:3026/api/v1',
        API_URL: 'https://staging.umana.co:3026/api/v1',
      },
      webpack(config, options) {
        config.module.rules.push({
          test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 100000,
            },
          },
        });
        return config;
      },
    }),
  ),
);
