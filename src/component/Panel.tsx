import { FC, Fragment, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Panel: FC<Props> = ({ children }) => {
  return (
    <Fragment>
      <h1>Panel Text</h1>
      {children}
    </Fragment>
  );
};

export { Panel };
