"use client";
import { MutableRefObject, SVGProps, useEffect, useRef } from "react";
import * as d3 from "d3";
import { Lap } from "../(models)/Lap";

type Props = {
  laps: Lap[];
  lapsData: any;
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

const SharedAxisChart = ({ laps, lapsData, dims }: Props) => {
  const svgRef = useRef();

  useEffect(() => {
    if (lapsData.length) {
      const svg = d3
        .select(svgRef.current)
        .attr("width", dims.w)
        .attr("height", (dims.h + dims.m) * Object.keys(CHARTS).length + dims.m)
        .style("overflow", "visible");

      const xScale = d3.scaleLinear().domain([0, 1]).range([0, dims.w]);
      const yScales = [];
    }
  }, [lapsData]);

  return <svg ref={svgRef} style={{ margin: dims.m }}></svg>;
};

export default SharedAxisChart;
