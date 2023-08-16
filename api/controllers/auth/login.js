require("dotenv").config();
const { User } = require("../../src/db");
const { response } = require("../../utils");
const comparePassword = require("../../helpers/comparePassword");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return response(res, 404, { msg: "Invalid username or password" });
  } else {
    try {
      let finded = await User.findOne({
        where: {
          username: username,
        },
      });

      if (!finded) {
        return response(res, 404, { msg: "User not found" });
      }

      const comparedPassword = await comparePassword(password, finded.password);

      if (!comparedPassword) {
        return response(res, 404, { msg: "Incorrect password" });
      }

      const token = jwt.sign({ id: finded.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES,
      });

      const cookiesOptions = {
        expires: new Date(
          Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
      };

      res.cookie("jwt", token, cookiesOptions);
      return response(res, 200, { msg: "Login successful", token });
    } catch (error) {
      console.log("Aca esta el error ", error);
      return response(res, 500, { msg: "An error occurred during login" });
    }
  }
};
