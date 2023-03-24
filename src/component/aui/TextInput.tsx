import { FC, memo } from "react";

interface Props {
  id: string;
  label: string;
  type: string;
  value: string;
  setValue: (s: string) => void;
}

const TextInput: FC<Props> = ({ id, label, type, value, setValue }) => {
  console.log("render " + id);
  return (
    <>
      <label
        htmlFor={id}
        className="font-Kanit block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        autoComplete="given-name"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
    </>
  );
};

export { TextInput };
export default memo(TextInput);
