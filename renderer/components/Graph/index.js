import * as d3 from "d3";
import { useEffect, useState } from "react";
import graphData from "../../data/graph_N50_0.json";
import { useD3 } from "../../hooks/useD3";

const Graph = (props) => {
  const { data } = props;
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  useEffect(() => {
    if (data !== null) {
      setNodes(data.nodes);
      setEdges(data.edges);
    }
  }, [data]);

  const ref = useD3(
    (svg) => {
      svg.selectAll("*").remove();
      svg.selectAll("*").remove();

      const minMaxX = [Number.MAX_SAFE_INTEGER, -1];
      const minMaxY = [Number.MAX_SAFE_INTEGER, -1];

      nodes.map((data) => {
        if (data.posX < minMaxX[0]) minMaxX[0] = data.posX;
        if (data.posX > minMaxX[1]) minMaxX[1] = data.posX;
        if (data.posY < minMaxY[0]) minMaxY[0] = data.posY;
        if (data.posY > minMaxY[1]) minMaxY[1] = data.posY;
      });

      const newEdges = [];
      for (let element = 0; element < edges.length; element++) {
        for (let index = 0; index < edges[element].to.length; index++) {
          const newEdge = {
            source: edges[element].source,
            target: edges[element].to[index].id,
          };

          if (
            newEdges.filter(
              (e) => e.source === newEdge.target && e.target === newEdge.source
            ).length === 0
          )
            newEdges.push(newEdge);
        }
      }

      const width = 16 * 40;
      const height = 16 * 40;

      svg = d3
        .select("#plot-area")
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0 0 640 640")
        .style("background-color", "white");

      const svgEdge = svg
        .selectAll("link")
        .data(newEdges)
        .enter()
        .append("line")
        .attr("class", "link")
        .style("stroke", "#000")
        .attr("stroke-width", 0.2)
        .attr("stroke-opacity", 0.6);

      const svgNode = svg
        .attr("class", "nodes")
        .selectAll("circle")
        .data(nodes)
        .enter()
        .append("circle")
        .attr("r", (data) => {
          if (data.id == 0) return 5;
          return (1 / data.urgency) * 10;
        })
        .attr("stroke", "#000")
        .attr("stroke-width", 1.5)
        .style("fill", (data) => {
          if (data.id == 0) return "blue";
          switch (data.urgency) {
            case 1:
              return "#4d0012";
            case 2:
              return "#ad032c";
            case 3:
              return "#fc839f";
            case 4:
              return "#ffe2ec";
            default:
              return "#000";
          }
        });

      svgNode
        .attr("cx", (data) => {
          const normalized =
            ((data.posX - minMaxX[0]) / (minMaxX[1] - minMaxX[0])) * width;
          return normalized;
        })
        .attr("cy", (data) => {
          const normalized =
            ((data.posY - minMaxY[0]) / (minMaxY[1] - minMaxY[0])) * height;
          return height - normalized;
        });

      svgEdge
        .attr("x1", (data) => {
          const posX = nodes.filter((aux) => data.source === aux.id)[0].posX;
          const normalized =
            ((posX - minMaxX[0]) / (minMaxX[1] - minMaxX[0])) * width;
          return normalized;
        })
        .attr("y1", (data) => {
          const posY = nodes.filter((aux) => data.source === aux.id)[0].posY;
          const normalized =
            ((posY - minMaxY[0]) / (minMaxY[1] - minMaxY[0])) * width;
          return height - normalized;
        })
        .attr("x2", (data) => {
          const posX = nodes.filter((aux) => data.target === aux.id)[0].posX;
          const normalized =
            ((posX - minMaxX[0]) / (minMaxX[1] - minMaxX[0])) * width;
          return normalized;
        })
        .attr("y2", (data) => {
          const posY = nodes.filter((aux) => data.target === aux.id)[0].posY;
          const normalized =
            ((posY - minMaxY[0]) / (minMaxY[1] - minMaxY[0])) * width;
          return height - normalized;
        });

      svgNode.append("title").text(function (d) {
        return d.name;
      });
    },
    [nodes]
  );

  return (
    <div
      id="d3"
      style={{
        width: "35rem",
        height: "35rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      className="container-fluid p-3 border shadow"
    >
      <svg ref={ref} id="plot-area"></svg>
    </div>
  );
};

export default Graph;
