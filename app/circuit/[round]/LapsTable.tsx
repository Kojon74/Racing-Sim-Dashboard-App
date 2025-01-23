"use client";
import { Lap } from "@/app/(models)/Lap";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

type Props = {
  laps: Lap[];
  setSelectedLaps: Dispatch<SetStateAction<Lap[]>>;
};

const LapsTable = ({ laps, setSelectedLaps }: Props) => {
  return (
    <div className="card bg-base-100">
      <table className="table text-base">
        <thead>
          <tr className="text-base">
            <th>Select</th>
            <th>Rank</th>
            <th>Name</th>
            <th>Lap Time</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {laps.map((lap, i) => (
            <LapRow
              key={lap._id.toString()}
              lap={lap}
              place={i + 1}
              setSelectedLaps={setSelectedLaps}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const LapRow = ({
  lap,
  place,
  setSelectedLaps,
}: {
  lap: Lap;
  place: number;
  setSelectedLaps: Dispatch<SetStateAction<Lap[]>>;
}) => {
  const handleToggleCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) setSelectedLaps((prev: Lap[]) => [...prev, lap]);
    else
      setSelectedLaps((prev: Lap[]) =>
        prev.filter((selectedLap) => selectedLap._id != lap._id)
      );
  };

  return (
    <tr>
      <td>
        <input
          type="checkbox"
          className="checkbox"
          onChange={handleToggleCheckbox}
        />
      </td>
      <th>{place}</th>
      <td>{lap.user.username}</td>
      <td>{msToTimeStr(lap.lapTime)}</td>
      <td>{new Date(lap.date).toDateString()}</td>
    </tr>
  );
};

const msToTimeStr = (ms: number) => {
  const mins = Math.floor(ms / 1000 / 60);
  const secs = (Math.floor(ms / 1000) % 60).toString().padStart(2, "0");
  const millis = (ms % 1000).toString().padStart(3, "0");
  return `${mins}:${secs}.${millis}`;
};

export default LapsTable;
