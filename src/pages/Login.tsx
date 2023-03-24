import { FC, useState } from "react";
import { Panel, Button } from "../component/aui";
import TextInput from "../component/aui/TextInput";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../app/slice/auth-slice";
import { useNavigate } from "react-router-dom";

const Login: FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = () => {
    fetch("http://54.254.44.166:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((value) => value.json())
      .then((data) => {
        if (data.succes) {
          dispatch(loginSuccess(data.token));
          navigate("/user");
        }
      });
  };
  return (
    <Panel title="Login">
      <div className="w-full md:w-1/2 mx-auto">
        <div className="flex flex-col gap-2 rounded-lg border p-4">
          <TextInput
            id="user-name"
            label="ทดสอบ User Name"
            type="text"
            value={username}
            setValue={setUsername}
          />
          <TextInput
            id="pwd"
            label="Password"
            type="password"
            value={password}
            setValue={setPassword}
          />
          <Button label="Login" onClick={login} />
        </div>
      </div>
    </Panel>
  );
};

export { Login };
