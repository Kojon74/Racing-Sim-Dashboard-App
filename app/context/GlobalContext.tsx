"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { Circuit } from "../(models)/Circuit";

const GlobalContext = createContext(null);
const GlobalProvider = ({ children }) => {
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
    <GlobalContext.Provider value={{ circuits }}>
      {children}
    </GlobalContext.Provider>
  );
};

const useGlobalContext = () => useContext(GlobalContext);

export { GlobalProvider, useGlobalContext };
