import { FC } from "react";

interface Props {
  btnClick: () => void;
  // addNew: (s: string) => boolean;
}

const DuckButton: FC<Props> = ({ btnClick }) => {
  return <button onClick={btnClick}>Add Todo</button>;
};

export { DuckButton };
