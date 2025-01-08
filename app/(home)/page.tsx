import CircuitsTable from "./CircuitsTable";

type Props = {};

const page = (props: Props) => {
  return (
    <section>
      <h1 className="text-4xl">F1 Sim Racing Dashbard</h1>
      <CircuitsTable />
    </section>
  );
};

export default page;
