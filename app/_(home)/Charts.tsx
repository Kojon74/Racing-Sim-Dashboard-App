"use client";
import React, { useEffect, useState } from "react";
import { getDownloadURL, ref } from "firebase/storage";
import * as d3 from "d3";
import { Lap } from "@/app/(models)/Lap";
import { storage } from "@/app/utils/firebase";
import SharedAxisChart from "../circuit/[round]/SharedAxisChart";

type Props = { laps: Lap[] };

const CHARTS = {
  delta: { yScalePct: false },
  speed: { yScalePct: false },
  throttle: { yScalePct: false },
  brake: { yScalePct: false },
  gear: { yScalePct: false },
  rpm: { yScalePct: false },
  drs: { yScalePct: false },
};

const Charts = ({ laps }: Props) => {
  const [chartDims, setChartDims] = useState({ w: 0, h: 250, m: 75 });
  const [lapsData, setLapsData] = useState<{ [field: string]: number[][] }>({});

  // Get window dims
  useEffect(() => {
    const { innerWidth: width } = window;
    setChartDims((prev) => ({ ...prev, w: width - 2 * prev.m }));
  }, []);

  useEffect(() => {
    (async () => {
      let curLapsData = Object.fromEntries(
        Object.keys(CHARTS).map((field) => [field, []])
      );
      const baseLap = await getLapData(laps[0]);
      laps.map(async (lap, i) => {
        const rawLap = await getLapData(lap);
        Object.keys(curLapsData).map((field) => {
          if (field === "delta")
            curLapsData[field].push(getDelta(baseLap, rawLap));
          else curLapsData[field].push(rawLap.map((d) => d[field]));
        });
      });
      setLapsData(curLapsData);
    })();
  }, [laps]);

  const getLapData = async (lap: Lap) => {
    const url = await getDownloadURL(
      ref(storage, `${lap.user.id}/${lap.track}/${lap.date.getTime()}.csv`)
    );
    return await d3.csv(url, d3.autoType);
  };

  // TODO: check
  const getDelta = (baseLap, curLap) =>
    baseLap.map(
      ({ distance_offset: d, time_elapsed: t }) =>
        t -
        curLap[d3.bisector((d) => d.distance_offset).left(curLap, d)]
          .time_elapsed
    );

  return (
    <section>
      <SharedAxisChart laps={laps} lapsData={lapsData} dims={chartDims} />
    </section>
  );
};

export default Charts;
