"use client";
import { useEffect, useState } from "react";
import { ReactSVG } from "react-svg";

const CIRCUIT_WIDTH = 600;

type Props = { tag: string; circuitName: string; percentage: number };

const CircuitSVG = ({ tag, circuitName, percentage }: Props) => {
  const [length, setLength] = useState(0);
  const [dot, setDot] = useState<{ x: number; y: number } | undefined>();

  useEffect(() => {
    if (length) {
      const svg = document.querySelector("svg");
      if (svg) {
        const path = svg.querySelector("path");
        if (path) {
          const point = path.getPointAtLength(length * percentage);
          const viewBox = svg.getAttribute("viewBox")?.split(" ").map(Number);
          if (viewBox) {
            const scale = CIRCUIT_WIDTH / viewBox[2];
            setDot({
              x: (point.x - viewBox[0]) * scale,
              y: (point.y - viewBox[1]) * scale,
            });
          } else console.error("SVG viewBox is undefined");
        }
      }
    }
  }, [length, percentage]);

  const beforeInjection = (svg: SVGSVGElement) => {
    svg.setAttribute("style", "max-width: 600px");
    const path = svg.getElementsByTagName("path")[0];
    path.setAttribute("stroke", "white");
    setLength(path.getTotalLength());
  };

  return (
    <div className="card bg-base-100 my-5 p-5 block">
      <h3 className="pb-5 text-center">{circuitName}</h3>
      <div className="relative mx-auto" style={{ maxWidth: CIRCUIT_WIDTH }}>
        <ReactSVG
          src={`/circuitSVGs/${tag}.svg`}
          beforeInjection={beforeInjection}
        />
        {dot && (
          <svg
            width="10"
            height="10"
            style={{
              position: "absolute",
              top: dot.y,
              left: dot.x,
              transform: "translate(-50%, -50%)",
            }}
          >
            <circle cx="5" cy="5" r="5" fill="white" />
          </svg>
        )}
      </div>
    </div>
  );
};

export default CircuitSVG;
