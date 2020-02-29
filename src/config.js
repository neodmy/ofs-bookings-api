module.exports = {
  server: {
    port: Number(process.env.SERVER_PORT) || 5002,
  },
  mongodb: {
    host: process.env.MONGOHOST || 'localhost',
    port: Number(process.env.MONGOPORT) || 27017,
    users: {
      db: process.env.DATABASE || 'bookings',
      col: process.env.COLLECTION || 'bookings',
    },
  },
};
