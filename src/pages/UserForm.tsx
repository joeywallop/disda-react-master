import { FC, useState, useEffect } from "react";
import { Button, Panel } from "../component/aui";
import TextInput from "../component/aui/TextInput";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

const UserForm: FC = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { token } = useSelector((state: RootState) => state.auth);
  const { id } = useParams();

  const toUser = () => {
    navigate("/user");
  };
  const save = async () => {
    try {
      const resp = await fetch(
        "http://54.254.44.166:3000/user" + (id ? `/${id}` : ""),
        {
          method: id ? "PUT" : "POST",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code,
            name,
            email,
          }),
        }
      );
      if (resp.status === 201 || resp.status === 200) {
        toUser();
      } else {
        console.log(resp.statusText);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const loadUserById = async (id: number) => {
    try {
      const resp = await fetch(`http://54.254.44.166:3000/user/by-id/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      const { data } = await resp.json();
      setCode(data.code);
      setName(data.name);
      setEmail(data.email);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (id) {
      loadUserById(parseInt(id));
    }
  }, [id]);

  return (
    <Panel title="บันทึกข้อมูลผู้ใช้งาน">
      <div className="flex flex-col gap-2">
        <TextInput
          type="text"
          id="code"
          label="Code"
          value={code}
          setValue={setCode}
        />
        <TextInput
          type="text"
          id="name"
          label="Name"
          value={name}
          setValue={setName}
        />
        <TextInput
          type="text"
          id="email"
          label="Email"
          value={email}
          setValue={setEmail}
        />
        <div className="flex flex-row gap-2">
          <Button label="Save" onClick={save} />
          <Button label="Cancel" onClick={toUser} />
        </div>
      </div>
    </Panel>
  );
};

export { UserForm };
