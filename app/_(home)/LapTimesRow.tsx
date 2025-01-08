"use client";
import { Lap } from "@/app/(models)/Lap";
import React, { ChangeEvent, Dispatch, SetStateAction } from "react";

type Props = {
  lap: Lap;
  place: number;
  setSelectedLaps: Dispatch<SetStateAction<Lap[]>>;
};

const LapTimesRow = ({ lap, place, setSelectedLaps }: Props) => {
  const { user, track, lapTime, date, sectorTimes, _id } = lap;

  const msToTimeStr = (ms: number) =>
    `${Math.floor(ms / 1000 / 60)}:${Math.floor(ms / 1000) % 60}.${ms % 1000}`;

  const handleClick = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) setSelectedLaps((prev: Lap[]) => [...prev, lap]);
    else
      setSelectedLaps((prev: Lap[]) =>
        prev.filter((selectedLap) => selectedLap._id != _id)
      );
  };

  return (
    <tr>
      <td>
        <input type="checkbox" className="checkbox" onChange={handleClick} />
      </td>
      <th>{place}</th>
      <td>{user.name}</td>
      <td>{msToTimeStr(lapTime)}</td>
      <td>{new Date(date).toDateString()}</td>
    </tr>
  );
};

export default LapTimesRow;
