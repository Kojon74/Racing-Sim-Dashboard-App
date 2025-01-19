"use client";
import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { Lap } from "../../(models)/Lap";

type Props = {
  laps: Lap[];
  lapsData: any;
  dims: { h: number; w: number; m: number };
};

const CHARTS = {
  delta: { yScalePct: false },
  speed: { yScalePct: false },
  throttle: { yScalePct: true },
  brake: { yScalePct: true },
  gear: { yScalePct: false },
  rpm: { yScalePct: false },
  drs: { yScalePct: false },
};

const SharedAxisChart = ({ laps, lapsData, dims }: Props) => {
  const svgRef = useRef();

  const colours = d3.scaleOrdinal(d3.schemeCategory10);

  const lineChart = (svg, xScale, field, i, yScalePct = true) => {
    // setting the scaling
    const yScaleDomain = yScalePct
      ? [0, 1]
      : [
          d3.min(lapsData.flat(), (d) => d[field]),
          d3.max(lapsData.flat(), (d) => d[field]),
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
      .line()
      .x((d) => xScale(d.distance_offset))
      .y((d) => yScale(d[field]));

    svg
      .selectAll(".line")
      .data(lapsData)
      .join("path")
      .attr("d", (d) => line(d))
      .attr("stroke", (d, i) => colours(i))
      .attr("fill", "none");
    // .attr("class", "line");

    return yScale;
  };

  useEffect(() => {
    // Set up SVG canvas
    const svg = d3
      .select(svgRef.current)
      .attr("width", dims.w)
      .attr("height", (dims.h + dims.m) * Object.keys(CHARTS).length + dims.m)
      .style("overflow", "visible");

    // Set up scales
    const xScale = d3.scaleLinear().domain([0, 1]).range([0, dims.w]);
    const yScales = [];
    Object.keys(CHARTS).map((field: string, i: number) =>
      yScales.push(lineChart(svg, xScale, field, i, CHARTS[field].yScalePct))
    );

    // const lines = document.getElementsByClassName("line");

    // const vertical = svg
    //   .append("line")
    //   .attr("stroke", "#fff")
    //   .attr("x1", 0)
    //   .attr("x2", 0)
    //   .attr("y1", 0)
    //   .attr("y2", (dims.h + dims.m) * Object.keys(CHARTS).length - dims.m)
    //   .style("opacity", 1e-6);

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

    // svg
    //   .on("mousemove", (e, d) => {
    //     const pageX = e.pageX - dims.m;
    //     // const distanceX = xScale.invert(pageX);
    //     // const leftIdx = bisect();
    //     vertical.attr("x1", pageX).attr("x2", pageX).style("opacity", 1);

    //     d3.selectAll(".tooltip").attr("transform", function (d, i) {
    //       const xPos = xScale.invert(pageX);

    //       const bisect = d3.bisector(function (d) {
    //         return d.distance_offset;
    //       }).right;
    //       const idx = bisect(lapsData[i], xPos);
    //       Object.keys(CHARTS).map((field, j) => {
    //         const yPos = yScales[j].invert(lapsData[i][idx][field]);
    //       });

    //       // let beginning = 0;
    //       // let end = lines[i].getTotalLength();
    //       // let target = null;

    //       // while (true) {
    //       //   target = Math.floor((beginning + end) / 2);
    //       //   pos = lines[i].getPointAtLength(target);
    //       //   if ((target === end || target === beginning) && pos.x !== pageX) {
    //       //     break;
    //       //   }
    //       //   if (pos.x > pageX) end = target;
    //       //   else if (pos.x < pageX) beginning = target;
    //       //   else break; //position found
    //       // }

    //       // d3.select(this)
    //       //   .select("text")
    //       //   .text(yScales[i].invert(pos.y).toFixed(2));

    //       return "translate(" + pageX + "," + pageX + ")";
    //     });
    //   })
    //   .on("mouseout", () => {
    //     vertical.style("opacity", 1e-6);
    //   });

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
  }, [lapsData]);

  const capitalizeFirstLetter = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  return <svg ref={svgRef} style={{ margin: dims.m }}></svg>;
};

export default SharedAxisChart;
