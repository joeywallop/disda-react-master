import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

const CounterDisplay: FC = () => {
  const value = useSelector((state: RootState) => state.counter.value);
  return <h1>{value}</h1>;
};

export { CounterDisplay };
