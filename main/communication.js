const net = require("net");
const { ipcMain } = require("electron");

const options = {
  port: 6969,
};

const sendMessage = (message, event) => {
  let res = "";

  const client = net.createConnection(options);
  client.setEncoding("utf8");

  client.on("connect", () => {
    console.log("Connection established");
    client.write(`${message}\n`);
  });

  client.on("data", (data) => {
    console.log("New message JSON");
    console.log(`Message length ${data.toString().length}`);
    res += data.toString();
    //const solution = JSON.parse(data.toString());
    client.end();
    //res = solution.solutions;
    //event.sender.send("message", res);
  });

  client.on("close", () => {
    console.log("Connection closed");
    const solution = JSON.parse(res.toString());
    const resJson = solution.solutions;
    event.sender.send("message", resJson);
  });

  client.on("error", (err) => {
    console.error(err);
  });

  return client;
};

exports.sendMessage = sendMessage;
