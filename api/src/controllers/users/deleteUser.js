const { User } = require('../../db.js');
const { response } = require('../../../utils');

module.exports = async (req, res) => {
  const { id } = req.params;

  const userId = await User.findByPk(id);

  if (!userId) return response(res, 404, { msg: 'User not found' });

  await User.destroy({
    where: {
      id: id
    }
  });

  return response(res, 200, { msg: 'User deleted successfully' });
};
