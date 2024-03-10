"use client";
import { useEffect, useRef } from "react";
import * as d3 from "d3";

type Props = {
  field: string;
  data1: any;
  data2: any;
  dims: { h: number; w: number; m: number };
};

const LineChart = ({ field, data1, data2, dims }: Props) => {
  const svgRef = useRef();

  useEffect(() => {
    if (data1.length && data2.length)
      (async () => {
        const svg = d3
          .select(svgRef.current)
          .attr("width", dims.w)
          .attr("height", dims.h)
          .style("overflow", "visible");

        // setting the scaleing
        const xScale = d3.scaleLinear().domain([0, 1]).range([0, dims.w]);
        const yScale = d3.scaleLinear().domain([0, 1]).range([dims.h, 0]);

        const line = d3
          .line()
          .x((d) => xScale(d.distance_offset))
          .y((d) => yScale(d[field]));

        // setting the axes
        const xAxis = d3.axisBottom(xScale).tickValues([]).tickSize(0);
        const yAxis = d3.axisLeft(yScale);
        // drawing the axes on the svg
        svg.append("g").call(xAxis).attr("transform", `translate(0,${dims.h})`);
        svg.append("g").call(yAxis);

        svg
          .append("text")
          .attr("text-anchor", "middle")
          .attr("transform", "rotate(-90)")
          .attr("y", -dims.m + 20)
          .attr("x", -dims.h / 2)
          .attr("fill", "white")
          .text(capitalizeFirstLetter(field));

        // setting up the data for the svg
        svg
          .selectAll(".line")
          .data([data1])
          .join("path")
          .attr("d", (d) => line(d))
          .attr("stroke", "blue")
          .attr("fill", "none");
        svg
          .selectAll(".line")
          .data([data2])
          .join("path")
          .attr("d", (d) => line(d))
          .attr("stroke", "red")
          .attr("fill", "none");
      })();
  }, [data1, data2]);

  const capitalizeFirstLetter = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  return <svg ref={svgRef} style={{ margin: dims.m }}></svg>;
};

export default LineChart;
