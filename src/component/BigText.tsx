import { FC } from "react";

interface Props {
  text: string;
  // another field;
}

const BigText: FC<Props> = ({ text }) => {
  return <h1>{text}</h1>;
};

export { BigText };
