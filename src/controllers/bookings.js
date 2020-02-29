/* eslint-disable no-underscore-dangle */
const logger = require('../utils/logger');
const createError = require('../utils/errors');
const bookingSchema = require('../schemas/booking');

module.exports = (store) => {
  logger.info('   BookingsController: starting');
  /**
   * Finds all documents in the collection
   * @return {Array} an array of objects or an empty array
   */
  const findAll = async () => {
    const result = await store.findAll();
    return result;
  };

  /**
   * Finds one document by the given id
   * @param {number} id The id to match
   * @return {Object} The object found
   */
  const findOneById = async (id) => {
    const result = await store.findOneById(id);
    if (!result) throw createError('Booking not found', 404);
    return result;
  };

  const insertOne = async (booking) => {
    const { error } = bookingSchema.validate(booking);
    if (error) throw createError(error.message, 400);
    const initDate = new Date(booking.start);
    const endDate = new Date(initDate.getTime() + booking.time);
    const result = await store.findOneByDate(initDate, endDate);
    if (result) throw createError('Invalid booking date', 400);
    booking.endDate = endDate;
    const { ops } = await store.insertOne(booking);
    return ops[0];
  };

  /**
   * Updates previous values with the new ones from the given object
   * @param {number} id The object id
   * @param {Object} inputData The updated object
   * @return {Object|null} The updated object or null
   */
  const updateOneById = async (id, booking) => {
    const { error } = bookingSchema.validate(booking);
    if (error) throw createError(error.message, 400);
    const result = await findOneById(id);
    delete result._id;
    const { value } = await store.updateOneById(id, booking);
    return value;
  };

  /**
   * Removes every object
   * @return {number} The number documents removed
   */
  const deleteAll = async () => {
    const { result } = await store.deleteAll();
    return result.n;
  };

  /**
   * Removes one document matching given id
   * @param {number} id The id of the document to be removed
   * @return {number} The number of documents removed
   */
  const deleteOneById = async (id) => {
    const currentBooking = await findOneById(id);
    const { result } = await store.deleteOneById(currentBooking._id);
    return result.n;
  };

  logger.info('   BookingsController: started');
  return {
    findAll,
    findOneById,
    insertOne,
    updateOneById,
    deleteOneById,
    deleteAll,
  };
};
