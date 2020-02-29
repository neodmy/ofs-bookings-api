const logger = require('../utils/logger');
const bookingRoutes = require('./bookings');


module.exports = (app, controllers) => {
  logger.info('Routes: starting');
  app.use('/bookings', bookingRoutes(controllers.bookingsController));
  logger.info('Routes: started');
};
