const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

module.exports = {
  calculateHash: async (plainText) => {
    const hashedPassword = await bcrypt.hash(plainText, SALT_ROUNDS);
    return hashedPassword;
  },
  verifyPassword: async (plainText, password) => {
    const result = await bcrypt.compare(plainText, password);
    return result;
  },
};
