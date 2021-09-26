// Reference Link: https://medium.com/the-node-js-collection/making-your-node-js-work-everywhere-with-environment-variables-2da8cdf6e786

const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  stripeSecretTest: process.env.STRIPE_SECRET_TEST,
  email: process.env.EMAIL,
  password: process.env.PASSWORD
};