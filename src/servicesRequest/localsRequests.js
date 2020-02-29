const logger = require('../utils/logger');


module.exports = (axios) => {
  const getLikedLocals = (likedLocals) => {
    const locals = [];
    Promise.all(
        locals.map(async (local) => {
          try {
            const local = await axios.get(`/${local}`);
            locals.push(local);
          } catch (error) {
            logger.error(error);
          }
        }),
    );
  };
};
