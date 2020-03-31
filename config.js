import axios from "axios";

const config = {
  app: {
    title: process.env.APP_TITLE || ' | Umana Admin',
    environment: process.env.ENVIRONMENT || 'development',
    api_url: process.env.API_URL || 'http://localhost:3026/api/v1'
  }
};

export default config;