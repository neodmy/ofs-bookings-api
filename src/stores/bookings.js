const { ObjectId } = require('mongodb');

const logger = require('../utils/logger');

module.exports = (connectMongo) => {
  logger.info('   BookingsStore: starting');
  const querys = (query) => async (id = 0, inputData = {}) => {
    const { client, collection } = await connectMongo();
    const options = {
      findAll: () => collection.find().toArray(),
      findOneById: () => collection.findOne({ _id: new ObjectId(id) }),
      findOneByNickname: () => collection.findOne({ nickname: inputData }),
      insertOne: () => {
        const data = {
          ...inputData,
          _id: new ObjectId(),
        };
        return collection.insertOne(data);
      },
      insertMany: () => collection.insertMany(inputData),
      updateOneById: () => collection.findOneAndUpdate(
        { _id: new ObjectId(id) }, { $set: inputData }, { returnOriginal: false },
      ),
      deleteOneById: () => collection.deleteOne({ _id: new ObjectId(id) }),
      deleteAll: () => collection.deleteMany({}),
    };
    const result = await options[query]();
    client.close();
    return result;
  };
  logger.info('   BookingsStore: started');
  return {
    findAll: () => querys('findAll')(),
    findOneById: (id) => querys('findOneById')(id),
    findOneByNickname: (inputData) => querys('findOneByNickname')(null, inputData),
    insertOne: (inputData) => querys('insertOne')(null, inputData),
    insertMany: (inputData) => querys('insertMany')(null, inputData),
    updateOneById: (id, inputData) => querys('updateOneById')(id, inputData),
    deleteOneById: (id) => querys('deleteOneById')(id),
    deleteAll: () => querys('deleteAll')(),
  };
};
