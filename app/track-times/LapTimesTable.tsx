import React from "react";
import LapTimesRow from "./LapTimesRow";
import Dropdown from "../components/Dropdown";

type Props = {};

type LapTimesType = { id: string; name: string; time: number; date: Date }[];

const LapTimesTable = (props: Props) => {
  const lapTimes: LapTimesType = [];
  const driversList;

  return (
    <section>
      <Dropdown title="Driver" items={driversList} />
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Lap Time</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {lapTimes.map((lapTime, i) => (
              <LapTimesRow key={i} lapTime={lapTime} place={i + 1} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default LapTimesTable;
