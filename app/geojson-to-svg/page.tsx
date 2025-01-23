"use client";
import { GeoJSON2SVG } from "geojson2svg";
import { ChangeEvent, useRef, useState } from "react";
import { saveAs } from "file-saver";
import reproject from "reproject";
import proj4 from "proj4";

const rotation = {
  "Bahrain Grand Prix": 92.0, // -92
  "Saudi Arabian Grand Prix": 104.0, // -104
  "Australian Grand Prix": 44.0, // -46
  "Japanese Grand Prix": 49.0, // 0
  "Chinese Grand Prix": 237.0, // -237
  "Miami Grand Prix": 2.0, // 0
  "Emilia Romagna Grand Prix": 178.0, // 0
  "Monaco Grand Prix": 315.0, // -315
  "Canadian Grand Prix": 62.0, // -65
  "Spanish Grand Prix": 303.0, // -302
  "Austrian Grand Prix": 1.0, // -20
  "British Grand Prix": 92.0, // 90
  "Hungarian Grand Prix": 40.0, // 50
  "Belgian Grand Prix": 91.0, // -97
  "Dutch Grand Prix": 0.0, // 180
  "Italian Grand Prix": 95.0, // -95
  "Azerbaijan Grand Prix": 357.0, // 55
  "Singapore Grand Prix": 335.0, // 0
  "United States Grand Prix": 0.0, // 6
  "Mexico City Grand Prix": 36.0, // -8
  "São Paulo Grand Prix": 258.0, // -267
  "Las Vegas Grand Prix": 90.0, // -90
  "Qatar Grand Prix": 61.0, // -61
  "Abu Dhabi Grand Prix": 280.0, // -260
};

const GeojsonToSvg = () => {
  const svgRef = useRef(null);

  const [svgString, setSvgString] = useState("");

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log(file);
    const options = {
      attributes: {
        stroke: "black",
        fill: "none",
      },
    };
    const converter = new GeoJSON2SVG(options);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const geoJSON = JSON.parse(e.target.result);
          const geoJSON3857 = reproject.reproject(
            geoJSON,
            "EPSG:4326",
            "EPSG:3857",
            proj4.defs
          );
          const svgStrings = converter.convert(geoJSON3857, options);
          setSvgString(svgStrings[0]);
          console.log(svgStrings[0]);
        } catch (error) {
          console.error("Error parsing GeoJSON:", error);
        }
      };
      reader.readAsText(file);
    }
  };

  const exportSvg = () => {
    if (!svgRef.current) return;

    const svgElement = svgRef.current;
    const svgData = new XMLSerializer().serializeToString(svgElement);

    const svgBlob = new Blob([svgData], {
      type: "image/svg+xml;charset=utf-8",
    });

    saveAs(svgBlob, "svg.svg");
  };

  return (
    <section className="bg-white h-screen">
      <input className="file-input" type="file" onChange={handleChangeFile} />
      <button className="btn" onClick={exportSvg}>
        Save
      </button>
      <svg ref={svgRef}>
        <g dangerouslySetInnerHTML={{ __html: svgString }} />
      </svg>
    </section>
  );
};

export default GeojsonToSvg;
