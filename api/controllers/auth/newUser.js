const { User } = require("../../src/db");
const encryptPassword = require("../../helpers/encryptPassword");
const { response } = require("../../utils");

module.exports = async (req, res) => {
  try {
    const { name, username, email, password, role } = req.body;
    if (!name || !username || !email || !password) {
      return response(res, 404, "Debes llenar todos los campos");
    }

    const encryptedPassword = await encryptPassword(password);

    const userCreated = await User.create({
      name,
      username,
      email,
      password: encryptedPassword,
    });
    res.json({ userCreated });
    res.redirect('/recipes')
  } catch (error) {
    console.log("show me the error ", error);
  }
};
