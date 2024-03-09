import React from "react";

type Props = {
  lapTime: { id: string; name: string; time: number; date: Date };
  place: number;
};

const LapTimesRow = ({ lapTime, place }: Props) => {
  const { id, name, time, date } = lapTime;

  return (
    <tr>
      <th>{place}</th>
      <td>{name}</td>
      <td>{time}</td>
      <td>{date.toDateString()}</td>
    </tr>
  );
};

export default LapTimesRow;
