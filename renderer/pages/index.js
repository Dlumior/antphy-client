import { useState, useEffect } from "react";
import ParametersForm from "../components/ParametersForm";
import SolutionTable from "../components/SolutionTable";
import MainLayout from "../layout/MainLayout";

const Home = () => {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const handleMessage = (event, message) => setMessage(message);
    window.electron.message.on(handleMessage);

    return () => {
      window.electron.message.off(handleMessage);
    };
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    window.electron.message.send(input);
    setMessage(null);
  };

  return (
    <MainLayout>
      {/* <h1 className="pt-2 mb-5">Hello Electron!</h1>

      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label" htmlFor="inMessage">
            Write something
          </label>
          <input
            autoFocus
            id="inMessage"
            className="form-control"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Send
        </button>
      </form> */}
      <div className="container-fluid g-4 mt-5">
        <div className="row">
          <div className="col-xxl-4 col-xl-6 col-lg-7">
            <ParametersForm />
          </div>
        </div>
        <div className="row">
          <div className="col-xxl-10">
            <SolutionTable />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;
