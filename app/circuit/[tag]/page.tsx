import Lap from "@/app/(models)/Lap";
import ClientPage from "./ClientPage";
import Circuit from "@/app/(models)/Circuit";

type Props = { params: { tag: string } };

const fetchLaps = async (tag: string) => {
  const circuit = await Circuit.findOne({ tag });
  const lapsRaw = await Lap.find({ circuit: circuit._id }).sort("lapTime");
  const laps = lapsRaw.map((lap) => {
    const lapObj = lap.toObject();
    return {
      ...lapObj,
      _id: lapObj._id.toString(),
      circuit: lapObj.circuit.toString(),
      user: { ...lapObj.user, _id: lapObj.user._id.toString() },
      date: new Date(lap.date),
    };
  });
  return laps;
};

const CircuitPage = async ({ params }: Props) => {
  const { tag } = params;
  const laps = await fetchLaps(tag);

  return <ClientPage tag={tag} laps={laps} />;
};

export default CircuitPage;
