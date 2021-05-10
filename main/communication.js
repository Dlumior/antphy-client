const net = require("net");

const options = {
  port: 6969,
};

const client = net.createConnection(options);
client.setEncoding("utf8");

client.on("connect", () => {
  console.log("Connection established");
  client.write("Hello from node");
  client.write("\n");
});

client.on("data", (data) => {
  console.log("New message");
  console.log(data.toString());
  client.end("Goodbye!");
});

client.on("close", () => {
  console.log("Connection closed");
});

client.on("error", (err) => {
  console.error(err);
});
