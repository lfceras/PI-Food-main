const bcryptjs = require('bcryptjs');

const comparePassword = async (password, receivedPassword) => {
  return await bcryptjs.compare(password, receivedPassword)
}

module.exports = comparePassword