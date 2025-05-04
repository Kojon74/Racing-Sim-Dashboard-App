"use client";
import { Circuit } from "@/app/(models)/Circuit";
import { useGlobalContext } from "../../context/GlobalContext";
import { useState } from "react";
import LapsTable from "./LapsTable";
import { Lap } from "@/app/(models)/Lap";
import Charts from "./Charts";
import CircuitSVG from "./CircuitSVG";

type Props = { tag: string; laps: Lap[] };

const ClientPage = ({ tag, laps }: Props) => {
  const { circuits } = useGlobalContext();

  const [showAllLaps, setShowAllLaps] = useState(false);
  const [displayLaps, setDisplayLaps] = useState<Lap[]>(getBestLaps(laps));
  const [selectedLaps, setSelectedLaps] = useState<Lap[]>([]);
  const [analyzeLaps, setAnalyzeLaps] = useState<Lap[]>([]);
  const [hoverPercentage, setHoverPercentage] = useState(0);

  const circuit = circuits.find((circuit: Circuit) => circuit.tag === tag);

  const handleToggleDisplayLaps = () => {
    const tempShowAllLaps = !showAllLaps;
    setShowAllLaps(tempShowAllLaps);
    setDisplayLaps(tempShowAllLaps ? laps : getBestLaps(laps));
  };

  if (!circuit) return;

  return (
    <section>
      <h1>{`${circuit.grandPrix} Grand Prix ${circuit.flag}`}</h1>
      <h2>{`${circuit.circuitName} • ${circuit.city}`}</h2>
      <button className="btn my-5" onClick={handleToggleDisplayLaps}>
        Show {showAllLaps ? "Best" : "All"} Laps
      </button>
      <button
        className="btn my-5 float-right bg-orange-500 text-white hover:bg-orange-500 hover:opacity-70  disabled:bg-orange-500 disabled:text-white disabled:opacity-30"
        onClick={() => setAnalyzeLaps(selectedLaps)}
        disabled={!selectedLaps.length}
      >
        Analyze
      </button>
      <LapsTable laps={displayLaps} setSelectedLaps={setSelectedLaps} />
      <CircuitSVG
        tag={circuit.tag}
        circuitName={circuit.circuitName}
        percentage={hoverPercentage}
      />
      <Charts
        laps={analyzeLaps}
        circuit={circuit}
        setHoverPercentage={setHoverPercentage}
      />
    </section>
  );
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

export default ClientPage;
