"use client";
import React, { useEffect, useState } from "react";
import LapTimesTable from "./LapTimesTable";
import TimeDistanceChart from "./TimeDistanceChart";
import DeltaChart from "./DeltaChart";
import LineChart from "./LineChart";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../utils/firebase";
import * as d3 from "d3";
import Charts from "./Charts";

type Props = {};

const TrackTimesPage = (props: Props) => {
  const [lap1, setLap1] = useState([]);
  const [lap2, setLap2] = useState([]);
  const [delta, setDelta] = useState([]);

  useEffect(() => {
    (async () => {
      const data1 = await getLapData("1710028227331");
      const data2 = await getLapData("1710028328462");
      const bisector = d3.bisector((d) => d.distance_offset);
      const deltaData = data2.map(
        ({ distance_offset: d, time_elapsed: t }) => ({
          distance_offset: d,
          delta: t - data1[bisector.left(data1, d)].time_elapsed,
        })
      );
      setLap1(data1);
      setLap2(data2);
      setDelta(deltaData);
    })();
  }, []);

  const getLapData = async (lapID: string) => {
    const url = await getDownloadURL(
      ref(storage, `BvexKpnnFuxvO6PmbmnX/${lapID}.csv`)
    );
    return await d3.csv(url, d3.autoType);
  };

  return (
    <section>
      {/* <LapTimesTable /> */}
      <Charts lap1={lap1} lap2={lap2} delta={delta} />
    </section>
  );
};

export default TrackTimesPage;
