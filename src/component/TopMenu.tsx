import { FC } from "react";
import { Link } from "react-router-dom";

const TopMenu: FC = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Root</Link>
        </li>
        <li>
          <Link to="/hello/z">Hello World</Link>
        </li>
        <li>
          <Link to="/home">Home</Link>
        </li>
      </ul>
    </nav>
  );
};

export { TopMenu };
