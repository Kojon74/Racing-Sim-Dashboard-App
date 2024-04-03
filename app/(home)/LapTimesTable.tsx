"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import LapTimesRow from "./LapTimesRow";
import Dropdown from "../components/Dropdown";
import { Lap } from "@/app/(models)/Lap";
import { Track } from "../(models)/Track";
import { User } from "../(models)/User";

type Props = {
  tracks: Track[];
  setSelectedTrack: Dispatch<SetStateAction<Track>>;
  users: User[];
  laps: Lap[];
  setSelectedLaps: Dispatch<SetStateAction<Lap[]>>;
};

const LapTimesTable = ({
  tracks,
  setSelectedTrack,
  users,
  laps,
  setSelectedLaps,
}: Props) => {
  const sort = ["Lap Time", "Date"];

  const [tempSelectedLaps, setTempSelectedLaps] = useState([]);

  const handleAnalyze = () => setSelectedLaps(tempSelectedLaps);

  return (
    <section className="">
      <Dropdown title="Sort" items={sort} />
      <Dropdown title="Track" items={tracks} onItemClick={setSelectedTrack} />
      <Dropdown title="Driver" items={users} />
      <button className="btn" onClick={handleAnalyze}>
        Analyze Selected Laps
      </button>
      <div className="">
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
              <LapTimesRow
                key={lap._id}
                lap={lap}
                place={i + 1}
                setSelectedLaps={setTempSelectedLaps}
              />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default LapTimesTable;
