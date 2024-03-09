"use client";

import * as d3 from "d3";
import { useEffect, useState } from "react";
import { storage } from "../utils/firebase";
import { ref, getDownloadURL } from "firebase/storage";

const TimeDistanceChart = () => {
  const [data, setData] = useState<number[][]>([]);

  const width = 1000;
  const height = 500;
  const margin = 0;

  console.log(
    d3.max(
      data,
      (d: { distance_offset: number; time_elapsed: number }) => d.time_elapsed
    )
  );

  const x = d3.scaleLinear([0, 1], [margin, width - margin]);
  const y = d3.scaleLinear(
    [
      0,
      d3.max(
        data,
        (d: { distance_offset: number; time_elapsed: number }) => d.time_elapsed
      ),
    ],
    [height - margin, margin]
  );
  const line = d3.line(
    (d) => x(d.distance_offset),
    (d) => y(d.time_elapsed)
  );

  useEffect(() => {
    (async () => {
      const url = await getDownloadURL(
        ref(storage, "BvexKpnnFuxvO6PmbmnX/1709761866932.csv")
      );
      const parsedData = await d3.csv(url, d3.autoType);
      console.log(parsedData);
      setData(parsedData);
    })();
  }, []);

  return (
    <svg width={width} height={height}>
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        d={line(data)}
      />
      <g fill="white" stroke="currentColor" strokeWidth="0.1">
        {data.map((d, i) => (
          <circle
            key={i}
            cx={x(d.distance_offset)}
            cy={y(d.time_elapsed)}
            r="0.1"
          />
        ))}
      </g>
    </svg>
  );
};

export default TimeDistanceChart;
