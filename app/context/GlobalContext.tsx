"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Circuit } from "../(models)/Circuit";

const defaultValues = { circuits: [] };

const GlobalContext = createContext<ContextType>(defaultValues);

type Props = { children: ReactNode };

const GlobalProvider = ({ children }: Props) => {
  const [circuits, setCircuits] = useState([]);

  useEffect(() => {
    (async () => {
      const resp = await fetch("/api/circuits", {
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

type ContextType = { circuits: any };

const useGlobalContext = () => useContext(GlobalContext);

export { GlobalProvider, useGlobalContext };
