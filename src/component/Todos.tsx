import { FC, memo } from "react";

interface Props {
  todos: string[];
}

const Todos: FC<Props> = ({ todos }) => {
  // use Hook
  console.log("render todos");
  return (
    <ul>
      {todos.map((value, index) => {
        return <li key={index}>{value}</li>;
      })}
    </ul>
  );
};

export default memo(Todos);
