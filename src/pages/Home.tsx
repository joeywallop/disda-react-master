import { FC, useState, useEffect } from "react";
import "./Home.css";
import style from "../style/my-style.module.css";
import { Button, Panel } from "../component/aui";

interface GeoModel {
  lat: string;
  lng: string;
}

interface AddressModel {
  street: string;
  geo: GeoModel;
}

interface UserModel {
  name: string;
  username: string;
  address: AddressModel;
}

const Home: FC = () => {
  // hook
  const [users, setUsers] = useState<UserModel[]>([]);
  const [headers, setHeaders] = useState<string[]>(["name", "username"]);
  useEffect(() => {
    loadData();
  }, []);

  // function
  const loadData = () => {
    fetch("https://jsonplaceholder.typicode.com/users").then((resp) => {
      resp.json().then((data: UserModel[]) => {
        setUsers(data);
        if (data.length > 0) {
          const d = data[0];
          const cols: string[] = [];
          for (let k in d) {
            cols.push(k);
          }
          setHeaders(cols);
        }
      });
    });
  };
  return (
    <Panel title="Home">
      <h1 style={{ color: "red", backgroundColor: "blue" }}>Inline Style</h1>
      <p>Test css</p>
      <h2 className={style.bigblue}>Style Module</h2>
      <h3 className="text-red-600 md:text-green-300">
        Tailwind css responsive
      </h3>
      <button
        onClick={loadData}
        className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md"
      >
        Load
      </button>
      <button className="btn-primary">Test Component</button>
      <Button label="test component" onClick={loadData} />
      <table>
        <thead>
          {headers.map((value) => (
            <th>{value}</th>
          ))}
        </thead>
        <tbody>
          {users.map((value, index) => {
            return (
              <tr key={index}>
                <td>{value.name}</td>
                <td>{value.username}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Panel>
  );
};

export { Home };
