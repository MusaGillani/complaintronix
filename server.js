// package imports
var express = require("express");
var socketIO = require("socket.io");

// local imports
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

Students.hasMany(Complaints);
Students.belongsTo(HostelHeads);
HostelHeads.hasMany(Complaints);
Students.hasMany(Chats);
HostelHeads.hasMany(ComplaintHandlers);
// ComplaintHandlers.hasMany(Complaints, {
//   foreignKey: "reg_no",
// });
Complaints.belongsTo(ComplaintHandlers, {
  foreignKey: "complaints_complaintee_reg_fkey",
});

//! ERROR with querying referenced tables, column name errors

db.authenticate()
  .then(() => console.log("Connection has been established successfully."))
  .catch((error) => console.error("Unable to connect to the database:", error));

db.sync()
  .then(() => {
    console.log("synced");
    var server = app.listen(PORT, () =>
      console.log(`Server started on ${PORT}`)
    );
    var serverSocket = socketIO(server);
    serverSocket.on("connection", (client) => {
      console.log(new Date().toTimeString());
      console.log("new user connected", client.id);
      client.on("message", function name(data) {
        console.log(data);
        serverSocket.emit("message", data);
      });

      client.on("services", () => {
        // console.log(data);
        require("./controllers/services")
          .fetchAll()
          .then((data) => serverSocket.emit("message", data))
          .catch((err) => console.log(err));
      });

      //listens when a user is disconnected from the server
      client.on("disconnect", function () {
        console.log(new Date().toTimeString());
        console.log("Disconnected...", client.id);
      });

      //listens when there's an error detected and logs the error on the console
      client.on("error", function (err) {
        console.log(new Date().toTimeString());
        console.log("Error detected", client.id);
        console.log(err);
      });
    });
    setInterval(
      () => serverSocket.emit("time", new Date().toTimeString()),
      1000
    );
  })
  .catch((err) => {
    console.log(err);
  });
