"use client";
import { useEffect, useRef } from "react";
import * as d3 from "d3";

type Props = { delta: any; dims: { h: number; w: number; m: number } };

const DeltaChart = ({ delta, dims }: Props) => {
  const svgRef = useRef();

  console.log(delta);

  useEffect(() => {
    if (delta.length)
      (async () => {
        const svg = d3
          .select(svgRef.current)
          .attr("width", dims.w)
          .attr("height", dims.h)
          .style("overflow", "visible");

        // setting the scaleing
        const xScale = d3.scaleLinear().domain([0, 1]).range([0, dims.w]);
        const yScale = d3
          .scaleLinear()
          .domain([
            d3.min(
              delta,
              (d: { distance_offset: number; delta: number }) => d.delta
            ),
            d3.max(
              delta,
              (d: { distance_offset: number; delta: number }) => d.delta
            ),
          ])
          .range([dims.h, 0]);

        const line = d3
          .line()
          .x((d) => xScale(d.distance_offset))
          .y((d) => yScale(d.delta));

        // setting the axes
        const xAxis = d3.axisBottom(xScale).tickValues([]).tickSize(0);
        const yAxis = d3.axisLeft(yScale);
        // drawing the axes on the svg
        svg
          .append("g")
          .call(xAxis)
          .attr("transform", `translate(0,${yScale(0)})`);
        svg.append("g").call(yAxis);

        svg
          .append("text")
          .attr("text-anchor", "middle")
          .attr("transform", "rotate(-90)")
          .attr("y", -dims.m + 20)
          .attr("x", -dims.h / 2)
          .attr("fill", "white")
          .text("Delta");

        // setting up the data for the svg
        svg
          .selectAll(".line")
          .data([delta])
          .join("path")
          .attr("d", (d) => line(d))
          .attr("stroke", "red")
          .attr("fill", "none");
      })();
  }, [delta]);

  return <svg ref={svgRef} style={{ margin: dims.m }}></svg>;
};

export default DeltaChart;
