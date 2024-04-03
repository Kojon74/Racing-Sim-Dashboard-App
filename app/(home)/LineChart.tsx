"use client";
import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { Lap } from "../(models)/Lap";

type Props = {
  laps: Lap[];
  lapsData: any;
  deltas: any;
  dims: { h: number; w: number; m: number };
};

const CHARTS = {
  delta: { yScalePct: false },
  speed: { yScalePct: false },
  throttle: { yScalePct: false },
  brake: { yScalePct: false },
  gear: { yScalePct: false },
  rpm: { yScalePct: false },
  drs: { yScalePct: false },
};

const LineChart = ({ laps, lapsData, deltas, dims }: Props) => {
  const svgRef = useRef();

  const colours = d3.scaleOrdinal(d3.schemeCategory10);

  const lineChart = (svg, xScale, field, i, yScalePct = true) => {
    const data = field === "delta" ? deltas : lapsData;
    console.log(field, data);

    // setting the scaleing
    const yScaleDomain = yScalePct
      ? [0, 1]
      : [
          d3.min(data.flat(), (d: { distance_offset: number }) => d[field]),
          d3.max(data.flat(), (d: { distance_offset: number }) => d[field]),
        ];
    const yScale = d3
      .scaleLinear()
      .domain(yScaleDomain)
      .range([dims.h * (i + 1) + dims.m * i, (dims.h + dims.m) * i]);

    const yAxis = d3.axisLeft(yScale);
    svg.append("g").call(yAxis);

    // y-axis label
    svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .attr("y", -dims.m + 20)
      .attr("x", (-(2 * i + 1) * dims.h) / 2 - i * dims.m)
      .attr("fill", "white")
      .text(capitalizeFirstLetter(field));

    // setting up the data for the svg
    const line = d3
      .line()
      .x((d) => xScale(d.distance_offset))
      .y((d) => yScale(d[field]));

    svg
      .selectAll(".line")
      .data(data)
      .join("path")
      .attr("d", (d) => line(d))
      .attr("stroke", (d, i) => colours(i))
      .attr("fill", "none");
  };

  useEffect(() => {
    if (deltas.length)
      (async () => {
        const svg = d3
          .select(svgRef.current)
          .attr("width", dims.w)
          .attr("height", (dims.h + dims.m) * Object.keys(CHARTS).length)
          .style("overflow", "visible");

        const xScale = d3.scaleLinear().domain([0, 1]).range([0, dims.w]);

        Object.keys(CHARTS).map((field: string, i: number) =>
          lineChart(svg, xScale, field, i, CHARTS[field].yScalePct)
        );

        const vertical = svg
          .append("line")
          .attr("stroke", "#fff")
          .attr("x1", 0)
          .attr("x2", 0)
          .attr("y1", 0)
          .attr("y2", (dims.h + dims.m) * Object.keys(CHARTS).length - dims.m)
          .style("opacity", 1e-6);
        svg
          .on("mousemove", (e, d) => {
            vertical
              .attr("x1", e.pageX - dims.m)
              .attr("x2", e.pageX - dims.m)
              .style("opacity", 1);
          })
          .on("mouseout", () => {
            vertical.style("opacity", 1e-6);
          });

        // setting the axes
        const xAxis = d3.axisBottom(xScale).tickValues([]).tickSize(0);
        // drawing the axes on the svg
        svg
          .append("g")
          .call(xAxis)
          .attr(
            "transform",
            `translate(0,${(dims.h + dims.m) * Object.keys(CHARTS).length})`
          );
      })();
  }, [deltas]);

  const capitalizeFirstLetter = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  return <svg ref={svgRef} style={{ margin: dims.m }}></svg>;
};

export default LineChart;
