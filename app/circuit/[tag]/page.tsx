import { Lap } from "@/app/(models)/Lap";
import ClientPage from "./ClientPage";

type Props = { params: { tag: string } };

const fetchLaps = async (tag: string) => {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/laps/${tag}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );
  const json = await resp.json();
  const laps = json.laps.map((lap: Lap) => ({
    ...lap,
    date: new Date(lap.date),
  }));
  return laps;
};

const CircuitPage = async ({ params }: Props) => {
  const { tag } = params;
  const laps = await fetchLaps(tag);

  return <ClientPage tag={tag} laps={laps} />;
};

export default CircuitPage;
