import { FC, Fragment, useRef } from "react";
import { DuckInput } from "./DuckInput";
import { DuckButton } from "./DuckButton";
import { DuckList } from "./DuckList";
import { useDispatch } from "react-redux";
import { addTodo } from "../app/slice/duck-slice";
import { useParams } from "react-router-dom";
import { TopMenu } from "./TopMenu";

const HelloWorld: FC = () => {
  const { name } = useParams();
  const dispatch = useDispatch();
  const inputEle = useRef<HTMLInputElement>(null);
  const duckClick = () => {
    const name = inputEle.current?.value;
    if (name) {
      dispatch(addTodo(name));
    }
  };

  return (
    <Fragment>
      <h1>{name}</h1>
      <DuckInput inputEle={inputEle} />
      <DuckButton btnClick={duckClick} />
      <DuckList />
    </Fragment>
  );
};

export default HelloWorld;
