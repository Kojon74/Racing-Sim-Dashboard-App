import React from "react";
import LapTimesTable from "./LapTimesTable";
import TimeDistanceChart from "./TimeDistanceChart";
import DeltaChart from "./DeltaChart";

type Props = {};

const TrackTimesPage = (props: Props) => {
  return (
    <section>
      {/* <LapTimesTable /> */}
      {/* <TimeDistanceChart data={undefined} /> */}
      <DeltaChart />
    </section>
  );
};

export default TrackTimesPage;
