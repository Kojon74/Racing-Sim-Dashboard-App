"use client";
import { Lap } from "@/app/(models)/Lap";
import { storage } from "@/app/utils/firebase";
import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import * as d3 from "d3";
import SharedAxisChart from "./SharedAxisChart";
import { Circuit } from "@/app/(models)/Circuit";
import { LapTelemetry } from "./types";

type Props = { laps: Lap[]; circuit: Circuit };

const Charts = ({ laps, circuit }: Props) => {
  const [lapsData, setLapsData] = useState<LapTelemetry[][]>([]);

  const chartDims = {
    w: window.innerWidth - 2 * 75,
    h: 250,
    m: 75,
  };

  useEffect(() => {
    if (laps.length)
      (async () => {
        const baseLap = await getLapData(laps[0]);
        const curLapsData = await Promise.all(
          laps.map(async (lap) => {
            const rawLap = await getLapData(lap);
            const updatedLap = updateDataDelta(rawLap, baseLap);
            return updatedLap;
          })
        );
        setLapsData(curLapsData);
      })();
  }, [laps]);

  const getLapData = async (lap: Lap) => {
    const url = await getDownloadURL(
      ref(storage, `${lap.user._id}/${lap.circuit}/${lap.date.getTime()}.csv`)
    );
    const lapData = (await d3.csv(url, d3.autoType)) as LapTelemetry[];
    return lapData;
  };

  if (!Object.keys(lapsData).length) return;

  return (
    <section className="card bg-base-100">
      <h3 className="text-center pt-5">Distance Charts</h3>
      <SharedAxisChart
        laps={laps}
        lapsData={lapsData}
        dims={chartDims}
        circuit={circuit}
      />
    </section>
  );
};

const updateDataDelta = (curLap: LapTelemetry[], baseLap: LapTelemetry[]) =>
  curLap.map((data) => ({
    ...data,
    delta: calcDelta(
      {
        distance_offset: data.distance_offset,
        time_elapsed: data.time_elapsed,
      },
      baseLap
    ),
  }));

const calcDelta = (
  {
    distance_offset,
    time_elapsed,
  }: { distance_offset: number; time_elapsed: number },
  baseLap: LapTelemetry[]
) =>
  time_elapsed -
  baseLap[
    d3
      .bisector((d: LapTelemetry) => d.distance_offset)
      .left(baseLap, distance_offset)
  ].time_elapsed;

export default Charts;
