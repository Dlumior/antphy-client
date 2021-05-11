import { useState } from "react";

const SolutionTable = (props) => {
  const { solutions = null } = props;
  const [prog, setProg] = useState(100);

  return (
    <div className="container-fluid mt-4 p-3 border shadow-sm">
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

      <table className="table table-sm caption-top">
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
                    {solution.totalCostPerHeuristic.TIME}
                  </td>
                  <td className="text-end">
                    {solution.totalCostPerHeuristic.URGENCY}
                  </td>
                  <td className="text-end">
                    {solution.totalCostPerHeuristic.COST}
                  </td>
                  <td className="text-end">{solution.totalCost}</td>
                </tr>
              );
            })}
          {/* <tr>
            <th scope="row">1</th>
            <td className="text-end">344.00</td>
            <td className="text-end">15550.00</td>
            <td className="text-end">15550.00</td>
            <td className="text-end">15550.00</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td className="text-end">258.00</td>
            <td className="text-end">28500.00</td>
            <td className="text-end">15550.00</td>
            <td className="text-end">15550.00</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td className="text-end">2880.00</td>
            <td className="text-end">the Bird</td>
            <td className="text-end">15550.00</td>
            <td className="text-end">15550.00</td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
};

export default SolutionTable;
