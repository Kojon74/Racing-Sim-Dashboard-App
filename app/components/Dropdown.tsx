type Props = { title: string; items: any[] };

const Dropdown = ({ title, items }: Props) => {
  return (
    <details className="dropdown">
      <summary className="m-1 btn">{title}</summary>
      <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </details>
  );
};

export default Dropdown;
