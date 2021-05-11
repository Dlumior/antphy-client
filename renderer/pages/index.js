import { useState, useEffect } from "react";
import ParametersForm from "../components/ParametersForm";
import SolutionTable from "../components/SolutionTable";
import MainLayout from "../layout/MainLayout";

const Home = () => {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState(null);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    const handleMessage = (event, message) => setMessage(message);
    window.electron.message.on(handleMessage);

    return () => {
      window.electron.message.off(handleMessage);
    };
  }, []);

  const onSubmit = (data) => {
    data = {
      ...data,
      file: data?.file[0].path,
    };
    const send = JSON.stringify(data);
    setMessage(null);
    window.electron.message.send(send);
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
