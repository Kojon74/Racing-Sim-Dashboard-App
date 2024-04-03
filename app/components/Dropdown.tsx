import { Dispatch, SetStateAction } from "react";

type Props = {
  title: string;
  items: any[];
  onItemClick?: Dispatch<SetStateAction<any>>;
};

const Dropdown = ({ title, items, onItemClick }: Props) => {
  return (
    <details className="dropdown">
      <summary className="m-1 btn">{title}</summary>
      <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
        {items.map((item, i) => (
          <li key={i} onClick={() => onItemClick && onItemClick(item)}>
            <a>{item.name}</a>
          </li>
        ))}
      </ul>
    </details>
  );
};

export default Dropdown;
