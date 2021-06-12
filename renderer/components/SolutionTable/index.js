import { useState } from "react";
import secondsToHHMM from "../../utils/formatHHSS";

const SolutionTable = (props) => {
  const { solutions = null, handleSelect } = props;
  const [prog, setProg] = useState(100);

  return (
    <div
      style={{ maxHeight: "25rem" }}
      className="container-fluid mt-xl-4 mt-xxl-0 p-3 border shadow-lg overflow-auto"
    >
      {solutions && console.log(solutions)}
      {!solutions && (
        <>
          <div className="progress">
            <div
              className="progress-bar progress-bar-striped progress-bar-animated"
              role="progressbar"
              style={{ width: `${prog}%` }}
              aria-valuenow="10"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
          <h3>Searching for solutions...</h3>
        </>
      )}

      <table className="table table-striped caption-top table-hover">
        <caption>Solutions</caption>
        <thead className="table-dark">
          <tr>
            <th scope="col" style={{ width: "2%" }}>
              #
            </th>
            <th scope="col" style={{ width: "20%", textAlign: "right" }}>
              Total time (HH:MM)
            </th>
            {/* <th scope="col" style={{ width: "20%", textAlign: "right" }}>
              Total urgency
            </th> */}
            <th scope="col" style={{ width: "20%", textAlign: "right" }}>
              Total cost (S/.)
            </th>
            <th
              scope="col"
              style={{
                width: "auto",
                textAlign: "right",
              }}
            >
              General cost
            </th>
            <th
              scope="col"
              style={{
                width: "auto",
                textAlign: "center",
              }}
            >
              Paths
            </th>
          </tr>
        </thead>
        <tbody>
          {solutions &&
            solutions.map((solution, index) => {
              return (
                <tr key={solution.id}>
                  <th scope="row">{index + 1}</th>
                  <td className="text-end">
                    {secondsToHHMM(
                      solution.partialCostPerHeuristicPath.TIME.reduce(
                        (a, b) => a + b,
                        0
                      )
                    )}
                    {/* {solution.totalCostPerHeuristic.TIME.toFixed(0)} */}
                  </td>
                  {/* <td className="text-end">
                    {solution.totalCostPerHeuristic.URGENCY.toFixed(0)}
                  </td> */}
                  <td className="text-end">
                    {solution.partialCostPerHeuristicPath.COST.reduce(
                      (a, b) => a + b,
                      0
                    ).toFixed(0)}
                  </td>
                  <td className="text-end">{solution.totalCost.toFixed(0)}</td>
                  <td className="text-center">
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={() => handleSelect(solution.id)}
                    >
                      View paths
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default SolutionTable;
