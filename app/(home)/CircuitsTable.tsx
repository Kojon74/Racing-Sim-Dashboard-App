"use client";
import React, { useEffect, useState } from "react";
import { Circuit } from "../(models)/Circuit";

type Props = {};

const CircuitsTable = (props: Props) => {
  const [circuits, setCircuits] = useState([]);

  useEffect(() => {
    (async () => {
      const resp = await fetch("http://localhost:3000/api/circuits", {
        method: "GET",
        cache: "no-store",
      });
      const json = await resp.json();
      setCircuits(
        json.circuits.sort((a: Circuit, b: Circuit) => a.round - b.round)
      );
    })();
  }, []);

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
  const { round, grandPrix, circuitName, country, city, flag, raceDate } =
    circuit;
  return (
    <tr>
      <th>{round}</th>
      <td>{`${flag} ${country}`}</td>
      <td>{circuitName}</td>
    </tr>
  );
};

export default CircuitsTable;
