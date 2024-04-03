"use client";
import React, { useEffect, useState } from "react";
import { getDownloadURL, ref } from "firebase/storage";
import * as d3 from "d3";
import { Lap } from "@/app/(models)/Lap";
import { storage } from "@/app/utils/firebase";
import LineChart from "./LineChart";

type Props = { laps: Lap[] };

const Charts = ({ laps }: Props) => {
  const [chartDims, setChartDims] = useState({ w: 0, h: 0, m: 0 });
  const [lapsData, setLapsData] = useState([]);
  const [deltas, setDeltas] = useState([]);

  // Get window dims
  useEffect(() => {
    const { innerWidth: width } = window;
    setChartDims({ w: width - 100, h: 250, m: 50 });
  }, []);

  useEffect(() => {
    (async () =>
      setLapsData(await Promise.all(laps.map((lap) => getLapData(lap)))))();
  }, [laps]);

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

  const getLapData = async (lap: Lap) => {
    const url = await getDownloadURL(
      ref(storage, `${lap.user.id}/${lap.track}/${lap.date.getTime()}.csv`)
    );
    return await d3.csv(url, d3.autoType);
  };

  return (
    <section>
      <LineChart
        laps={laps}
        lapsData={lapsData}
        deltas={deltas}
        dims={chartDims}
      />
    </section>
  );
};

export default Charts;
