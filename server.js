// package imports
var express = require("express");

// local imports
const logger = require("./util/logging");
const db = require("./config/db");
const Students = require("./models/Students");
const Complaints = require("./models/Complaints");
const ComplaintHandlers = require("./models/ComplaintHandlers");
const HostelHeads = require("./models/HostelHeads");
const Chats = require("./models/Chats");

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

const PORT = process.env.PORT || 5000;

Students.hasMany(Complaints, {
  foreignKey: {
    allowNull: false,
    // foreignKey: "complaints_complaintee_reg_fkey",
  },
});
Students.belongsTo(HostelHeads, {
  targetKey: "assigned_hostel",
  foreignKey: {
    allowNull: false,
    // foreignKey: "complaints_hostel_no_fkey",
  },
});
HostelHeads.hasMany(Complaints, {
  foreignKey: {
    allowNull: false,
  },
});
Students.hasMany(Chats, {
  foreignKey: {
    allowNull: false,
  },
});
HostelHeads.hasMany(ComplaintHandlers, {
  foreignKey: {
    allowNull: false,
  },
});
ComplaintHandlers.hasMany(Complaints, {
  foreignKey: {
    allowNull: false,
  },
});
Complaints.belongsTo(ComplaintHandlers, {
  foreignKey: {
    allowNull: false,
    // foreignKey: "complaints_complaintee_reg_fkey",
  },
});
// TODO add default values for columns
//! ERROR with querying referenced tables, column name errors

db.authenticate()
  .then(() => {
    logger.debug("Connection has been established successfully.");
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    logger.error("Unable to connect to the database:", error.toString());
    console.error("Unable to connect to the database:", error);
  });

db
  // sync()
  .sync({ force: true })
  .then(() => {
    logger.debug("synced");
    console.log("synced");
    var server = app.listen(PORT, () => {
      logger.debug(`Server started on ${PORT}`);
      console.log(`Server started on ${PORT}`);
    });
    require("./routes/messageSocket")(server);
  })
  .catch((error) => {
    logger.error(error.toString());
    console.log(error);
  });
