// next.config.js
const withSass = require('@zeit/next-sass');

module.exports = {
  env: {
    APP_TITLE: ' | Umana admin',
    APP_CLOUDINARY: 'https://api.cloudinary.com/v1_1/umana-storage',
    APP_ENV: 'development',
    // API_URL: 'http://localhost:3026/api/v1',
    // API_URL: 'https://staging.umana.co:3026/api/v1',
  },
};

// module.exports = withSass({
//   cssModules: true,
// });
