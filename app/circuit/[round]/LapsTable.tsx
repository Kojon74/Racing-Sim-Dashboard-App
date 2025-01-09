"use client";
import { Lap } from "@/app/(models)/Lap";

type Props = {
  laps: Lap[];
};

const LapsTable = ({ laps }: Props) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th></th>
          <th></th>
          <th>Name</th>
          <th>Lap Time</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {laps.map((lap, i) => (
          <LapRow key={lap._id} lap={lap} place={i + 1} />
        ))}
      </tbody>
    </table>
  );
};

const LapRow = ({ lap, place }: { lap: Lap; place: number }) => {
  return (
    <tr>
      <td>
        <input type="checkbox" className="checkbox" />
      </td>
      <th>{place}</th>
      <td>{lap.user.username}</td>
      <td>{msToTimeStr(lap.lapTime)}</td>
      <td>{new Date(lap.date).toDateString()}</td>
    </tr>
  );
};

const msToTimeStr = (ms: number) =>
  `${Math.floor(ms / 1000 / 60)}:${Math.floor(ms / 1000) % 60}.${ms % 1000}`;

export default LapsTable;
