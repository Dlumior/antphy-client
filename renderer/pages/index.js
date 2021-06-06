import { useState, useEffect } from "react";
import Graph from "../components/Graph";
import ParametersForm from "../components/ParametersForm";
import SolutionTable from "../components/SolutionTable";
import MainLayout from "../layout/MainLayout";

const Home = () => {
  const [message, setMessage] = useState([]);
  const [data, setData] = useState(null);

  useEffect(() => {
    const handleMessage = (event, message) => setMessage(message);
    window.electron.message.on(handleMessage);

    return () => {
      window.electron.message.off(handleMessage);
    };
  }, []);

  const onSubmit = (data) => {
    const newData = {
      ...data,
      file: data?.file[0].path,
    };
    const send = JSON.stringify(newData);
    setMessage(null);
    console.log(`Sending:\n${send}\n`);
    window.electron.message.send(send);

    const graphFile = window.electron.readFile(newData.file);
    const graphJson = JSON.parse(graphFile);
    console.log(graphJson);
    setData(graphJson);
  };

  return (
    <MainLayout>
      <div className="container-fluid g-4 mt-5">
        <div className="row">
          <div className="col-xxl-4 col-xl-12 gx-5">
            <div className="row">
              <ParametersForm onSubmit={onSubmit} />
            </div>
            <div className="row mt-3 mb-3">
              <Graph data={data} />
            </div>
          </div>
          <div className="col">
            <div className="row">
              <SolutionTable solutions={message} />
            </div>
            <div className="row">Hellooooo</div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;
