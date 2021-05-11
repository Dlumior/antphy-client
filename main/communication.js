const net = require("net");
const { ipcMain } = require("electron");

const options = {
  port: 6969,
};

let res = null;

const sendMessage = (message, event) => {
  const client = net.createConnection(options);
  client.setEncoding("utf8");

  client.on("connect", () => {
    console.log("Connection established");
    client.write(`${message}\n`);
  });

  client.on("data", (data) => {
    console.log("New message JSON");
    const solution = JSON.parse(data.toString());
    client.end();
    res = solution.solutions;
    event.sender.send("message", res);
    // ipcMain.on("response", (event, message) => {
    //   console.log(message);
    //   event.sender.send(res);
    // });
  });

  client.on("close", () => {
    console.log("Connection closed");
  });

  client.on("error", (err) => {
    console.error(err);
  });

  return client;
};

exports.sendMessage = sendMessage;
