const {axios} = require('axios');
const locals = require('./localsRequests');
const reviews = require('./reviewRequests');

const axiosLocals = axios.create({
  baseURL: process.env.LOCALS_SERVICE,
});

const axiosReviews = axios.create({
  baseURL: process.env.REVIEWS_SERVICE,
});

module.exports = () => {
  const localsFunctions = locals(axiosLocals);
  const reviewFunctions = reviews(axiosReviews);
  return {
    localsFunctions,
    reviewFunctions,
  };
};
