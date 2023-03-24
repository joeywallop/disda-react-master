import { FC, RefObject } from "react";

interface Props {
  inputEle: RefObject<HTMLInputElement>;
}

const DuckInput: FC<Props> = ({ inputEle }) => {
  return <input ref={inputEle} />;
};

export { DuckInput };
