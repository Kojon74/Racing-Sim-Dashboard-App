"use client";
import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { Lap } from "../../(models)/Lap";
import { Circuit } from "@/app/(models)/Circuit";
import { LapTelemetry } from "./types";
import { capitalizeFirstLetter } from "@/app/utils/stringUtils";

// TODO: lapsData type
type Props = {
  laps: Lap[];
  lapsData: LapTelemetry[][];
  dims: { h: number; w: number; m: number };
  circuit: Circuit;
  setHoverPercentage: any;
};

const CHARTS = {
  delta: { yScalePct: false, units: "(s)" },
  speed: { yScalePct: false, units: "(km/h)" },
  throttle: { yScalePct: true, units: "" },
  brake: { yScalePct: true, units: "" },
  gear: { yScalePct: false, units: "" },
  rpm: { yScalePct: false, units: "" },
  drs: { yScalePct: false, units: "" },
};

const SharedAxisChart = ({
  laps,
  lapsData,
  dims,
  circuit,
  setHoverPercentage,
}: Props) => {
  console.log("RERENDER");
  const svgRef = useRef(null);

  useEffect(() => {
    d3.select(svgRef.current).selectAll("*").remove();
  }, [lapsData]);

  useEffect(() => {
    const height = (dims.h + dims.m) * Object.keys(CHARTS).length + dims.m;
    // Set up SVG canvas
    const svg = d3
      .select(svgRef.current)
      .attr("width", dims.w)
      .attr("height", height)
      .style("overflow", "visible");

    // Set up scales
    const xScale = d3.scaleLinear().domain([0, 1]).range([0, dims.w]);
    const yScales: d3.ScaleLinear<number, number, never>[] = [];

    // Draw corner vertical lines under line charts
    circuit.corners.forEach((cornerDist) =>
      svg
        .append("line")
        .attr("x1", xScale(cornerDist / circuit.length))
        .attr("x2", xScale(cornerDist / circuit.length))
        .attr("y1", 0)
        .attr("y2", height - dims.m)
        .attr("stroke", "#475569")
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", "4 2")
    );

    // Draw corner vertical line labels
    Object.keys(CHARTS).forEach((_, chartIdx) => {
      svg
        .append("text")
        .attr("x", 0)
        .attr("y", (dims.h + dims.m) * chartIdx + dims.h + dims.m / 2)
        .attr("fill", "white")
        .text("Turn");
      circuit.corners.forEach((cornerDist, cornerIdx) =>
        svg
          .append("text")
          .attr("text-anchor", "middle")
          .attr("x", xScale(cornerDist / circuit.length))
          .attr("y", (dims.h + dims.m) * chartIdx + dims.h + dims.m / 2)
          .attr("fill", "white")
          .text(cornerIdx + 1)
      );
    });

    // Draw line charts
    (Object.keys(CHARTS) as Array<keyof typeof CHARTS>).map(
      (field, i: number) =>
        yScales.push(
          lineChart(
            lapsData,
            svg,
            xScale,
            field,
            i,
            dims,
            CHARTS[field].yScalePct
          )
        )
    );

    const lines = document.getElementsByClassName("line");

    const vertical = svg
      .append("line")
      .attr("stroke", "#fff")
      .attr("x1", 0)
      .attr("x2", 0)
      .attr("y1", 0)
      .attr("y2", (dims.h + dims.m) * Object.keys(CHARTS).length - dims.m)
      .style("opacity", 1e-6);

    // var tooltips = vertical
    //   .selectAll(".tooltip")
    //   .data(lapsData)
    //   .enter()
    //   .append("g")
    //   .attr("class", "tooltip");

    // tooltips
    //   .append("circle")
    //   .attr("r", 7)
    //   .style("stroke", "white")
    //   .style("fill", "none")
    //   .style("stroke-width", "1px")
    //   .style("opacity", "0");

    // tooltips.append("text").attr("transform", "translate(10,3)");

    svg
      .on("mousemove", (e) => {
        const pageX = e.pageX - dims.m - 24; // TODO: fix, due to the card
        //  Move vertical line
        vertical.attr("x1", pageX).attr("x2", pageX).style("opacity", 1);
        const xPos = xScale.invert(pageX);
        setHoverPercentage(xPos);

        // d3.selectAll(".tooltip").attr("transform", function (d, i) {
        //   const bisect = d3.bisector(
        //     (d: LapTelemetry) => d.distance_offset
        //   ).right;
        // const idx = bisect(lapsData[0], xPos);

        //   Object.keys(CHARTS).map((field, j) => {
        //     const yPos = yScales[j].invert(
        //       lapsData[i][idx][field as keyof typeof CHARTS]
        //     );
        //   });

        //   return "translate(" + pageX + "," + pageX + ")";
        // });
      })
      .on("mouseout", () => {
        vertical.style("opacity", 1e-6);
        setHoverPercentage(0);
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
  }, [lapsData, circuit, dims, setHoverPercentage]);

  return <svg ref={svgRef} style={{ margin: dims.m }}></svg>;
};

const lineChart = (
  lapsData: LapTelemetry[][],
  svg: d3.Selection<null, unknown, null, undefined>,
  xScale: d3.ScaleLinear<number, number, never>,
  field: keyof typeof CHARTS,
  i: number,
  dims: { h: number; w: number; m: number },
  yScalePct = true
) => {
  const colours = d3
    .scaleOrdinal(d3.schemeCategory10)
    .domain(Array.from({ length: 10 }, (_, i) => i.toString()));

  // setting the scaling
  const yScaleDomain: number[] = yScalePct
    ? [0, 1]
    : [
        d3.min(lapsData.flat(), (d) => d[field]) ?? 0,
        d3.max(lapsData.flat(), (d) => d[field]) ?? 0,
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
    .attr("y", -dims.m + 25)
    .attr("x", (-(2 * i + 1) * dims.h) / 2 - i * dims.m)
    .attr("fill", "white")
    .text(capitalizeFirstLetter(field));

  // setting up the data for the svg
  const line = d3
    .line<LapTelemetry>()
    .x((d) => xScale(d.distance_offset))
    .y((d) => yScale(d[field]));

  const charts = svg.selectAll(".line").data(lapsData);

  charts
    .join("path")
    .attr("d", (d) => line(d))
    .attr("stroke", (d, i) => colours(i.toString()))
    .attr("fill", "none");

  return yScale;
};

export default SharedAxisChart;
