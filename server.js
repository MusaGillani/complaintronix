// package imports
var express = require("express");

// local imports
const logger = require("./util/logging");
const db = require("./config/db");

// express app
const app = express();

// middleware
app.use(express.json());
// for purpose of testing server
// home page file for connecting to socket and displaying real-time clock of server
app.get("/", (req, res) => {
  res.sendFile("./index.html", { root: __dirname });
});

// routes
app.use("/api/complaints", require("./routes/api/complaints"));
app.use("/api/heads", require("./routes/api/heads"));
app.use("/api/students", require("./routes/api/students"));

const PORT = process.env.PORT || 5000;

var server = app.listen(PORT, () => {
  logger.debug(`Server started on ${PORT}`);
  console.log(`Server started on ${PORT}`);
});
require("./routes/messageSocket")(server);
