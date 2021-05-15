import { useState, useEffect } from "react";
import ParametersForm from "../components/ParametersForm";
import SolutionTable from "../components/SolutionTable";
import MainLayout from "../layout/MainLayout";
// import io from "socket.io-client";

// const connectionOpt = {
//   host: "127.0.0.1",
//   port: "6969",
// };

const Home = () => {
  const [message, setMessage] = useState([]);
  const [response, setResponse] = useState(null);

  // const socket = io(`http://${connectionOpt.host}:${connectionOpt.port}/run`, {
  //   transports: ["polling", "websocket"],
  // });

  // socket.on("connect", () => {
  //   console.log(socket.id);
  //   console.log(socket.connected);
  // });

  useEffect(() => {
    const handleMessage = (event, message) => setMessage(message);
    window.electron.message.on(handleMessage);

    return () => {
      window.electron.message.off(handleMessage);
    };
  }, []);

  // useEffect(() => {
  //   console.log("Enter to useEffect");
  //   socket.on("message", (res) => {
  //     console.log("There is a response");
  //     console.log(res.toString().length);
  //     const answer = JSON.parse(res.toString());
  //     setMessage(answer.solutions);
  //   });
  // });

  const onSubmit = (data) => {
    data = {
      ...data,
      file: data?.file[0].path,
    };
    const send = JSON.stringify(data);
    setMessage(null);
    console.log(`Sending:\n${send}\n`);
    window.electron.message.send(send);
    // socket.emit("message", {
    //   userName: "DL",
    //   message: "a new message",
    //   actionTime: new Date(),
    // });
  };

  return (
    <MainLayout>
      {message && console.log(message)}
      <div className="container-fluid g-4 mt-5">
        <div className="row">
          <div className="col-xxl-4 col-xl-12">
            <ParametersForm onSubmit={onSubmit} />
          </div>
          <div className="col">
            <SolutionTable solutions={message} />
          </div>
        </div>
        <div className="row"></div>
      </div>
    </MainLayout>
  );
};

export default Home;
