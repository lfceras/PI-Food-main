require("dotenv").config();
const jwt = require("jsonwebtoken");
const { User } = require("../../src/db");
const { promisify } = require("util");

module.exports = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      //  aca para decodificar el token de JWT
      const decodificada = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      // aca para verificar que el usuario se encuentre registrado en nuestra DB

      let verified = await User.findOne({
        where: {
          id: decodificada.id,
        },
      });

      if (verified) {
        req.user = verified;
        console.log(req.user);
      } else {
        console.log("User not found");
      }

    } catch (error) {
      console.log("Error during user verification: " ,error);
      return next()
    }
  } else {
    res.redirect("/auth/login");
    next();
  }
};
