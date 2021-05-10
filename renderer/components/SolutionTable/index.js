const SolutionTable = () => {
  return (
    <div className="container-fluid mt-4 p-3 border shadow-sm">
      <table className="table table-sm caption-top">
        <caption>Solutions founded</caption>
        <thead className="table-dark">
          <tr>
            <th scope="col" style={{ width: "2rem" }}>
              #
            </th>
            <th scope="col" style={{ width: "10rem", textAlign: "right" }}>
              Total time
            </th>
            <th scope="col" style={{ width: "10rem", textAlign: "right" }}>
              Total urgency
            </th>
            <th scope="col" style={{ width: "auto" }}>
              Number of paths
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td className="text-end">344.00</td>
            <td className="text-end">15550.00</td>
            <td>15</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td className="text-end">258.00</td>
            <td className="text-end">28500.00</td>
            <td>14</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td className="text-end">2880.00</td>
            <td className="text-end">the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SolutionTable;
