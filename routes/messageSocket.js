const chats = require("../models/chats");

var socketIO = require("socket.io");
const SOCKETURL = "/messageSocket";

module.exports = (server) => {
  var serverSocket = socketIO(server);
  serverSocket.of(SOCKETURL).on("connection", (client) => {
    console.log(new Date().toTimeString());
    console.log("new user connected", client.id);

    chats
      .getPreviousMessages()
      .then((result) => {
        let allMessages = result;
        client.emit("message", JSON.stringify(allMessages));
      })
      .catch((err) => console.log(err));

    client.on("message", function name(data) {
      console.log(data, client.id);
      // serverSocket.emit("message", data);
      let allMessages;
      chats
        .addMessage(data["sender"], data["text"])
        .then((result) => {
          allMessages = result;
          console.log(allMessages[allMessages.length - 1]);
          // data = data + " from server";
          client.emit("message", JSON.stringify(allMessages));
        })
        .catch((err) => console.log(err));
    });

    client.on("services", () => {
      // console.log(data);
      require("../controllers/services")
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
  setInterval(() => serverSocket.emit("time", new Date().toTimeString()), 1000);
};
