"use client";
import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Lap } from "@/app/(models)/Lap";

type Props = {
  laps: Lap[];
  lapsData: any;
  dims: { h: number; w: number; m: number };
};

const DeltaChart = ({ laps, lapsData, dims }: Props) => {
  const svgRef = useRef();

  const [deltas, setDeltas] = useState([]);

  useEffect(() => {
    if (lapsData.length)
      (async () => {
        const bisector = d3.bisector((d) => d.distance_offset);
        const deltaData = lapsData.slice(1).map((lapData) =>
          lapsData[0].map(({ distance_offset: d, time_elapsed: t }) => ({
            distance_offset: d,
            delta: t - lapData[bisector.left(lapData, d)].time_elapsed,
          }))
        );
        setDeltas(deltaData);
      })();
  }, [lapsData]);

  useEffect(() => {
    if (deltas.length)
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
              deltas[0],
              (d: { distance_offset: number; delta: number }) => d.delta
            ),
            d3.max(
              deltas[0],
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
          .data(deltas)
          .join("path")
          .attr("d", (d) => line(d))
          .attr("stroke", "red")
          .attr("fill", "none");
      })();
  }, [deltas]);

  return <svg ref={svgRef} style={{ margin: dims.m }}></svg>;
};

export default DeltaChart;
