"use client";
import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../utils/firebase";

type Props = {};

const DeltaChart = (props: Props) => {
  const svgRef = useRef();

  const w = 1000;
  const h = 500;
  const m = 50;

  useEffect(() => {
    (async () => {
      const bestLap = await getLapData("1709761866932");
      const otherLap = await getLapData("1709761967063");
      const bisector = d3.bisector((d) => d.distance_offset);
      const delta = otherLap.map(({ distance_offset: d, time_elapsed: t }) => ({
        distance_offset: d,
        delta: t - bestLap[bisector.left(bestLap, d)].time_elapsed,
      }));

      const svg = d3
        .select(svgRef.current)
        .attr("width", w)
        .attr("height", h)
        .style("overflow", "visible");

      // setting the scaleing
      const xScale = d3.scaleLinear().domain([0, 1]).range([0, w]);
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
        .range([h, 0]);

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

      // setting up the data for the svg
      svg
        .selectAll(".line")
        .data([delta])
        .join("path")
        .attr("d", (d) => line(d))
        .attr("stroke", "red")
        .attr("fill", "none");
    })();
  }, []);

  const getLapData = async (lapID) => {
    const url = await getDownloadURL(
      ref(storage, `BvexKpnnFuxvO6PmbmnX/${lapID}.csv`)
    );
    return await d3.csv(url, d3.autoType);
  };

  return <svg ref={svgRef} style={{ margin: m }}></svg>;
};

export default DeltaChart;
