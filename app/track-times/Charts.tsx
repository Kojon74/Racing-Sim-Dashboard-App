import React from "react";
import DeltaChart from "./DeltaChart";
import LineChart from "./LineChart";

type Props = { lap1: any; lap2: any; delta: any };

const Charts = ({ lap1, lap2, delta }: Props) => {
  const chartDims = { w: 1000, h: 250, m: 50 };

  return (
    <section>
      <DeltaChart delta={delta} dims={chartDims} />
      <LineChart field="gas" data1={lap1} data2={lap2} dims={chartDims} />
      <LineChart field="brake" data1={lap1} data2={lap2} dims={chartDims} />
    </section>
  );
};

export default Charts;
