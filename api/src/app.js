const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const routes = require("./routes/recipes.routes");
const auth = require("./routes/auth.routes");
const diets = require("./routes/diets.routes");
const handlers = require("../utils/errors/handlers");
const {createRoles} = require('../src/libs/initialState.js')

require("./db.js");

const server = express();

createRoles()

server.name = "API";

server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(
  cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
    credentials: true,
  })
);
server.use(cookieParser());
server.use(morgan("dev"));

server.use("/auth", auth);
server.use("/recipes", routes);
server.use("/diets", diets);

server.use("*", handlers.notFoundHandler);
server.use(handlers.errorHandler);

module.exports = server;
