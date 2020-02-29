const logger = require('../utils/logger');
const initBookingsController = require('./bookings');

module.exports = ({ stores }) => {
  logger.info('Controllers: starting');
  const bookingsController = initBookingsController(stores.bookingssStore);
  logger.info('Controllers: started');
  return {
    bookingsController,
  };
};
