import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faWarehouse,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import secondsToHHMM from "../../utils/formatHHSS";

const Paths = (props) => {
  const { nodes = null, solutions, selected, handleOpenUrl } = props;
  const [solution, setSolution] = useState(null);

  useEffect(() => {
    const result = solutions.filter((sol) => sol.id === selected);
    setSolution(result[0]);
  }, [selected]);

  const openUrl = (path) => {
    const baseUrl = "https://www.google.com/maps/dir";
    let directions = "";
    path.forEach((element) => {
      const latitud = nodes.filter((n) => n.id == element)[0]?.latitud;
      const longitude = nodes.filter((n) => n.id == element)[0]?.longitude;
      directions += `${latitud},${longitude}/`;
    });
    handleOpenUrl(`${baseUrl}/${directions}`);
  };

  return (
    <div
      style={{ maxHeight: "35rem" }}
      className="container-fluid mt-xl-5 mt-xxl-0 p-3 border shadow-lg overflow-auto"
    >
      <p>Paths</p>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {solution &&
          solution?.paths?.map((path, i) => {
            return (
              <div key={path[1]} className="col">
                <div className="card h-100">
                  <div className="card-body">
                    <div className="card-title d-flex flex-wrap justify-content-between align-items-start">
                      <div className="me-auto">
                        <h5>
                          <FontAwesomeIcon
                            icon={faCircle}
                            style={{
                              color: `#${(i * 0xfffff * 1000000)
                                .toString(16)
                                .slice(0, 6)}`,
                            }}
                          />{" "}
                          🚚 Path {i + 1}
                        </h5>
                      </div>
                      <span className="badge bg-secondary ms-1">
                        Urgency{" "}
                        {solution.partialCostPerHeuristicPath.URGENCY[
                          i
                        ].toFixed(0)}
                      </span>
                      <span className="badge bg-secondary ms-1">
                        Cost{" S/."}
                        {solution.partialCostPerHeuristicPath.COST[i].toFixed(
                          0
                        )}
                      </span>
                      <span className="badge bg-secondary ms-1">
                        Time{" "}
                        {secondsToHHMM(
                          solution.partialCostPerHeuristicPath.TIME[i]
                        )}
                        {/* {solution.partialCostPerHeuristicPath.TIME[i].toFixed(
                          0
                        )} */}
                      </span>
                    </div>
                    <div className="card-text">
                      <ul className="list-group">
                        {path.map((node, i) => {
                          return (
                            <li key={node + i} className="list-group-item">
                              <div className="d-flex justify-content-between align-items-start">
                                <div>
                                  <FontAwesomeIcon
                                    icon={
                                      node === "0"
                                        ? faWarehouse
                                        : faMapMarkerAlt
                                    }
                                    color="#4a3933"
                                  />{" "}
                                  {nodes.filter((n) => n.id == node)[0]?.name}
                                </div>
                                <div>
                                  {
                                    nodes.filter((n) => n.id == node)[0]
                                      ?.urgency
                                  }
                                </div>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                  <div className="card-footer">
                    <div className="card text-center">
                      <button
                        className="btn btn-primary"
                        onClick={() => openUrl(path)}
                      >
                        Show the path
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Paths;
