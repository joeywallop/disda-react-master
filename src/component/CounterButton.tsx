import { FC } from "react";
import { useDispatch } from "react-redux";
import { increment, decrement, addValue } from "../app/slice/counter-slice";

const CounterButton: FC = () => {
  const dispatch = useDispatch();
  return (
    <>
      <button onClick={() => dispatch(increment())}>Add</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(addValue(10))}>Add Value</button>
    </>
  );
};

export { CounterButton };
