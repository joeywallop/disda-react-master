import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useDispatch } from "react-redux";
import { deleteTodo } from "../app/slice/duck-slice";

const DuckList: FC = () => {
  const todos = useSelector((state: RootState) => state.duck.todos);
  const dispatch = useDispatch();
  return (
    <>
      <ul>
        {todos.map((model, index) => (
          <li key={index}>
            {model.name}{" "}
            <button onClick={() => dispatch(deleteTodo(index))}>del</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export { DuckList };
