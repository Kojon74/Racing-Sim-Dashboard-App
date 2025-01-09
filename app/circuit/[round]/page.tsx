"use client";
import { Circuit } from "@/app/(models)/Circuit";
import { useGlobalContext } from "../../context/GlobalContext";
import { useEffect, useState } from "react";
import LapsTable from "./LapsTable";
import { Lap } from "@/app/(models)/Lap";

type Props = { params: { round: string } };

const Page = ({ params }: Props) => {
  const { circuits } = useGlobalContext();

  const [laps, setLaps] = useState([]);

  const circuit = circuits.find(
    (circuit: Circuit) => circuit.round.toString() === params.round
  );

  useEffect(() => {
    if (circuit?.id)
      (async () => {
        const resp = await fetch(
          `http://localhost:3000/api/laps/${circuit._id}`,
          {
            method: "GET",
            cache: "no-store",
          }
        );
        const json = await resp.json();
        setLaps(
          json.laps.map((lap: Lap) => ({ ...lap, date: new Date(lap.date) }))
        );
      })();
  }, [circuit?._id]);

  if (!circuit) return;

  return (
    <section>
      <h1>{`${circuit.grandPrix} Grand Prix ${circuit.flag}`}</h1>
      <h2>{circuit.circuitName}</h2>
      <LapsTable laps={laps} />
    </section>
  );
};

export default Page;
