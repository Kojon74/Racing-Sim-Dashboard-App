"use client";
import { Circuit } from "../(models)/Circuit";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "../context/GlobalContext";

const CircuitsTable = () => {
  const { circuits } = useGlobalContext();

  return (
    <div className="card bg-base-100 p-5 my-5">
      <table className="table ">
        <thead>
          <tr>
            <th>#</th>
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
  const { round, circuitName, country, flag, tag } = circuit;

  const router = useRouter();

  const handleClick = () => router.push(`/circuit/${tag}`);

  return (
    <tr className="hover:cursor-pointer" onClick={handleClick}>
      <td>{round}</td>
      <td>{`${flag} ${country}`}</td>
      <td>{circuitName}</td>
    </tr>
  );
};

export default CircuitsTable;
