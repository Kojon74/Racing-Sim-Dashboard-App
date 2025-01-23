import { ReactSVG } from "react-svg";

type Props = { tag: string; circuitName: string };

const CircuitSVG = ({ tag, circuitName }: Props) => {
  const beforeInjection = (svg: SVGSVGElement) => {
    svg.setAttribute("style", "max-width: 600px; margin: auto");
    svg.getElementsByTagName("path")[0].setAttribute("stroke", "white");
  };

  return (
    <div className="card bg-base-100 my-5 p-5 flex justify-center align-center">
      <h3 className="pb-5 text-center">{circuitName}</h3>
      <ReactSVG
        src={`/circuitSVGs/${tag}.svg`}
        beforeInjection={beforeInjection}
      />
    </div>
  );
};

export default CircuitSVG;
