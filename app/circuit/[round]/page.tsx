"use client";
import { Circuit } from "@/app/(models)/Circuit";
import { useGlobalContext } from "../../context/GlobalContext";
import { useEffect, useState } from "react";
import LapsTable from "./LapsTable";
import { Lap } from "@/app/(models)/Lap";
import Charts from "./Charts";

type Props = { params: { round: string } };

const Page = ({ params }: Props) => {
  const { circuits } = useGlobalContext();

  const [showAllLaps, setShowAllLaps] = useState(false);
  const [laps, setLaps] = useState([]);
  const [displayLaps, setDisplayLaps] = useState<Lap[]>([]);
  const [selectedLaps, setSelectedLaps] = useState<Lap[]>([]);
  const [analyzeLaps, setAnalyzeLaps] = useState<Lap[]>([]);

  const circuit = circuits.find(
    (circuit: Circuit) => circuit.round.toString() === params.round
  );

  useEffect(() => {
    if (circuit?._id)
      (async () => {
        const resp = await fetch(
          `http://localhost:3000/api/laps/${circuit._id}`,
          {
            method: "GET",
            cache: "no-store",
          }
        );
        const json = await resp.json();
        const tempLaps = json.laps.map((lap: Lap) => ({
          ...lap,
          date: new Date(lap.date),
        }));
        setLaps(tempLaps);
        setDisplayLaps(getBestLaps(tempLaps));
      })();
  }, [circuit?._id]);

  const handleToggleDisplayLaps = () => {
    const tempShowAllLaps = !showAllLaps;
    setShowAllLaps(tempShowAllLaps);
    setDisplayLaps(tempShowAllLaps ? laps : getBestLaps(laps));
  };

  const getBestLaps = (laps: Lap[]) => {
    const bestLaps = Object.values(
      laps.reduce((best: { [username: string]: Lap }, lap: Lap) => {
        if (
          !best[lap.user.username] ||
          lap.lapTime < best[lap.user.username].lapTime
        )
          best[lap.user.username] = lap;
        return best;
      }, {})
    );
    return bestLaps;
  };

  if (!circuit) return;

  return (
    <section>
      <h1>{`${circuit.grandPrix} Grand Prix ${circuit.flag}`}</h1>
      <h2>{circuit.circuitName}</h2>
      <button className="btn mt-5" onClick={handleToggleDisplayLaps}>
        Show {showAllLaps ? "Best" : "All"} Laps
      </button>
      <button
        className="btn mt-5 float-right bg-orange-500 text-white hover:bg-orange-500 hover:opacity-70  disabled:bg-orange-500 disabled:text-white disabled:opacity-30"
        onClick={() => setAnalyzeLaps(selectedLaps)}
        disabled={!selectedLaps.length}
      >
        Analyze
      </button>
      <LapsTable laps={displayLaps} setSelectedLaps={setSelectedLaps} />
      <Charts laps={analyzeLaps} />
    </section>
  );
};

export default Page;
