require('dotenv').config()


const production = {
  user: process.env.MONGO_USERNAME,
  password: process.env.MONGO_PASSWORD,
  root_url: '',
  JWT_key: process.env.POLING_API_JWT_KEY,
};
module.exports = production;
