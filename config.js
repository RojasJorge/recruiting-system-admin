const config = {
  app: {
    environment: process.env.ENVIRONMENT || 'development',
    api_url: process.env.API_URL || 'http://128.199.162.22:3026/api/v1'
  }
};

export default config;
