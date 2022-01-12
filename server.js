// package imports
const express = require("express");
const cors = require("cors");

// local imports
const db = require("./config/db");

// express app
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/complaints", require("./routes/api/complaints"));
app.use("/api/heads", require("./routes/api/heads"));

const PORT = process.env.PORT || 5000;

db.authenticate()
  .then(() => console.log("Connection has been established successfully."))
  .catch((error) => console.error("Unable to connect to the database:", error));

db.sync()
  .then(() => {
    console.log("synced");
    app.listen(PORT, () => console.log(`Server started on ${PORT}`));
  })
  .catch((err) => {
    console.log(err);
  });
