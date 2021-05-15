import { useState } from "react";

const SolutionTable = (props) => {
  const { solutions = null } = props;
  const [prog, setProg] = useState(100);

  return (
    <div className="container-fluid mt-xl-4 mt-xxl-0 p-3 border shadow-lg">
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
              Total time
            </th>
            <th scope="col" style={{ width: "20%", textAlign: "right" }}>
              Total urgency
            </th>
            <th scope="col" style={{ width: "20%", textAlign: "right" }}>
              Total cost
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
          </tr>
        </thead>
        <tbody>
          {solutions &&
            solutions.map((solution, index) => {
              return (
                <tr key={solution.id}>
                  <th scope="row">{index + 1}</th>
                  <td className="text-end">
                    {solution.totalCostPerHeuristic.TIME.toFixed(2)}
                  </td>
                  <td className="text-end">
                    {solution.totalCostPerHeuristic.URGENCY.toFixed(2)}
                  </td>
                  <td className="text-end">
                    {solution.totalCostPerHeuristic.COST.toFixed(2)}
                  </td>
                  <td className="text-end">{solution.totalCost.toFixed(2)}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default SolutionTable;
