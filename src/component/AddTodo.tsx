import { FC, useReducer, useRef } from "react";

interface TodoModel {
  name: string;
}

interface TodoAction {
  type: string;
  payload: string;
}
const initialState: TodoModel[] = [];

const reducer = (state: TodoModel[], action: TodoAction) => {
  console.log(action.type, action.payload);
  if (action.type === "ADD") {
    return [...state, { name: action.payload }];
  } else if (action.type === "DEL") {
    const filState = state.filter(
      (value, index) => index !== parseInt(action.payload)
    );
    return filState;
  } else {
    return state;
  }
};

const AddTodo: FC = () => {
  const [todos, dispatch] = useReducer(reducer, initialState);
  const inputEle = useRef<HTMLInputElement>(null);
  const btnClick = () => {
    const value = inputEle.current?.value;
    if (value) {
      dispatch({ type: "ADD", payload: value });
    } else {
      console.log("invalid value");
    }
  };
  const delBtn = (s: number) => {
    dispatch({ type: "DEL", payload: s.toString() });
  };
  return (
    <>
      <input ref={inputEle} />
      <button onClick={btnClick}>Add Todo</button>
      <ul>
        {todos.map((model, index) => (
          <li key={index}>
            {model.name} <button onClick={() => delBtn(index)}>del</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export { AddTodo };
