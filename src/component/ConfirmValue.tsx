import { FC, useRef, useState } from "react";

interface Model {
  value1: string;
  value2: string;
}

const ConfirmValue: FC = () => {
  const [value, setValue] = useState<Model>({ value1: "", value2: "" });
  //   const [value2, setValue2] = useState("");
  const eleRef = useRef<HTMLInputElement>(null);
  const eleRef2 = useRef<HTMLInputElement>(null);
  const btnClick = () => {
    // setValue(eleRef.current?.value1 ?? "");
    setValue((prevState) => ({
      ...prevState,
      value1: eleRef.current?.value ?? "",
      value2: eleRef2.current?.value ?? "",
    }));
  };
  return (
    <>
      <input ref={eleRef} />
      <input ref={eleRef2} />
      <button onClick={btnClick}>Add</button>
      <h1>
        {value.value1} {value.value2}
      </h1>
    </>
  );
};

export { ConfirmValue };
