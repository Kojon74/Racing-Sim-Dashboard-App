"use client";
import { Circuit } from "../(models)/Circuit";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "../context/GlobalContext";

const CircuitsTable = () => {
  const { circuits } = useGlobalContext();

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Round</th>
            <th>Country</th>
            <th>Circuit</th>
          </tr>
        </thead>
        <tbody>
          {circuits.map((circuit: Circuit) => (
            <CircuitRow circuit={circuit} key={circuit.round} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const CircuitRow = ({ circuit }: { circuit: Circuit }) => {
  const { round, circuitName, country, flag } = circuit;

  const router = useRouter();

  const handleClick = () => router.push(`/circuit/${round}`);

  return (
    <tr className="hover:cursor-pointer" onClick={handleClick}>
      <th>{round}</th>
      <td>{`${flag} ${country}`}</td>
      <td>{circuitName}</td>
    </tr>
  );
};

export default CircuitsTable;
