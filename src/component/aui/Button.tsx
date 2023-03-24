import { FC } from "react";

interface Props {
  label: string;
  onClick: () => void;
}

const Button: FC<Props> = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="hover:bg-blue-700 py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md"
    >
      {label}
    </button>
  );
};

export { Button };
