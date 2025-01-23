"use client";
import { Lap } from "@/app/(models)/Lap";
import { storage } from "@/app/utils/firebase";
import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import * as d3 from "d3";
import SharedAxisChart from "./SharedAxisChart";
import { Circuit } from "@/app/(models)/Circuit";

type Props = { laps: Lap[]; circuit: Circuit };

type LapTelemetry = {
  distance_offset: number;
  time_elapsed: number;
  brake: number;
  drs: number;
  gear: number;
  rpm: number;
  speed: number;
  throttle: number;
}[];

const Fields = {
  distance_offset: { chart: false },
  delta: { chart: true, yScalePct: false },
  speed: { chart: true, yScalePct: false },
  throttle: { chart: true, yScalePct: false },
  brake: { chart: true, yScalePct: false },
  gear: { chart: true, yScalePct: false },
  rpm: { chart: true, yScalePct: false },
  drs: { chart: true, yScalePct: false },
};

const Charts = ({ laps, circuit }: Props) => {
  const [chartDims, setChartDims] = useState({ w: 0, h: 250, m: 75 });
  const [lapsData, setLapsData] = useState<
    {
      distance_offset: number;
      time_elapsed: number;
      brake: number;
      drs: number;
      gear: number;
      rpm: number;
      speed: number;
      throttle: number;
    }[][]
  >([]);

  // Get window dims
  useEffect(() => {
    const { innerWidth: width } = window;
    setChartDims((prev) => ({ ...prev, w: width - 2 * prev.m }));
  }, []);

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
      ref(storage, `${lap.user.id}/${lap.circuit}/${lap.date.getTime()}.csv`)
    );
    const lapData: LapTelemetry = await d3.csv(url, d3.autoType);
    return lapData;
  };

  const updateDataDelta = (curLap: LapTelemetry, baseLap: LapTelemetry) =>
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
    baseLap: LapTelemetry
  ) =>
    time_elapsed -
    baseLap[
      d3.bisector((d) => d.distance_offset).left(baseLap, distance_offset)
    ].time_elapsed;

  if (!Object.keys(lapsData).length) return;

  return (
    <section className="card bg-base-100">
      <SharedAxisChart
        laps={laps}
        lapsData={lapsData}
        dims={chartDims}
        circuit={circuit}
      />
    </section>
  );
};

export default Charts;
