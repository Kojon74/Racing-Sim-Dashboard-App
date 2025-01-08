"use client";
import React, { useEffect, useState } from "react";
import LapTimesTable from "./LapTimesTable";
import Charts from "./Charts";
import { Lap } from "../(models)/Lap";
import { Track } from "../(models)/Circuit";
import { User } from "../(models)/User";

type Props = {};

const Home = (props: Props) => {
  const [laps, setLaps] = useState<Lap[]>([]);
  const [selectedLaps, setSelectedLaps] = useState<Lap[]>([]);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [selectedTrack, setSelectedTrack] = useState<Track>();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    (async () => {
      setTracks(
        (
          await (
            await fetch("http://localhost:3000/api/tracks", {
              method: "GET",
              cache: "no-store",
            })
          ).json()
        ).tracks
      );
      setUsers(
        (
          await (
            await fetch("http://localhost:3000/api/users", {
              method: "GET",
              cache: "no-store",
            })
          ).json()
        ).users
      );
    })();
  }, []);

  useEffect(() => {
    if (selectedTrack)
      (async () =>
        setLaps(
          (
            await (
              await fetch(
                `http://localhost:3000/api/laps/${selectedTrack._id}`,
                {
                  method: "GET",
                  cache: "no-store",
                }
              )
            ).json()
          ).laps.map((lap: Lap) => ({ ...lap, date: new Date(lap.date) }))
        ))();
  }, [selectedTrack]);

  return (
    <section className="bg-black">
      <LapTimesTable
        tracks={tracks}
        setSelectedTrack={setSelectedTrack}
        users={users}
        laps={laps}
        setSelectedLaps={setSelectedLaps}
      />
      {!!selectedLaps.length && <Charts laps={selectedLaps} />}
    </section>
  );
};

export default Home;
