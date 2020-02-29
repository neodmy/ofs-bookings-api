const { MongoClient } = require('mongodb');

const logger = require('../utils/logger');
const initBookingsStore = require('./bookings');

module.exports = ({ host, port, users }) => {
  const mongoUrl = `mongodb://${host}:${port}`;

  const connectMongo = ({ db, col }) => async () => {
    const client = await MongoClient.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const database = client.db(db);
    const collection = database.collection(col);
    return {
      client,
      collection,
    };
  };

  logger.info('Stores: starting');
  const bookingsStore = initBookingsStore(connectMongo(users));
  logger.info('Stores: started');
  return {
    bookingsStore,
  };
};
