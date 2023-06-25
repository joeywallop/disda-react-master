import { FC, Fragment, ReactNode, useEffect, useState } from "react";
import { Button, ConfirmDialog, Pagination, Panel } from "../component/aui";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { Navigate, useNavigate } from "react-router-dom";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import TextInput from "../component/aui/TextInput";

interface ColProps {
  value: string;
}

interface TableProps {
  children: ReactNode;
}

const Col: FC<ColProps> = ({ value }) => {
  return (
    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
      <div className="flex">
        <div className="flex-shrink-0 w-10">{value}</div>
      </div>
    </td>
  );
};

const HDR: FC<ColProps> = ({ value }) => {
  return (
    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
      {value}
    </th>
  );
};

const Table: FC<TableProps> = ({ children }) => {
  return (
    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
      <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">{children}</table>
      </div>
    </div>
  );
};

interface UserModel {
  id: number;
  code: string;
  name: string;
  email: string;
}

interface UserResp {
  success: boolean;
  data: UserModel[];
  total: number;
}

const User: FC = () => {
  const [user, setUser] = useState<UserResp>({
    success: false,
    data: [],
    total: 0,
  });
  const { isLogedIn, token } = useSelector((state: RootState) => state.auth);
  const [selectdUser, setSelectdUser] = useState<UserModel>();
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(5);

  const navigate = useNavigate();
  const getUser = () => {
    fetch(
      `http://54.254.44.166:3000/user/search?limit=${limit}&offset=${offset}`,
      {
        method: "POST",
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
    )
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      });
  };

  const changePage = (v: number) => {
    if (v < 0) {
      setOffset(0);
    } else if (v > user.total) {
    } else {
      setOffset(v);
    }
  };

  useEffect(() => getUser(), [offset]);

  const delUser = async (id: number) => {
    try {
      // const resp = await fetch('http://54.254.44.166:3000/user/'+id);
      const resp = await fetch(`http://54.254.44.166:3000/user/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      if (resp.status === 200) {
        getUser();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const toUserForm = () => {
    navigate("/user-form");
  };

  const toEditUserForm = (id: number) => {
    // navigate("/user-form/" + id);
    navigate(`/user-form/${id}`);
  };

  return (
    <Fragment>
      {isLogedIn ? (
        <Panel title="แสดงข้อมูลผู้ใช้งาน">
          <div className="flex flex-col md:flex-row gap-2 mb-2">
            <div className="w-full md:w-32">
              <TextInput
                type="text"
                id="code"
                label="code"
                value={code}
                setValue={setCode}
              />
            </div>
            <div className="w-full md:w-72">
              <TextInput
                type="text"
                id="name"
                label="name"
                value={name}
                setValue={setName}
              />
            </div>
            <div className="flex-grow">
              <TextInput
                type="text"
                id="email"
                label="email"
                value={email}
                setValue={setEmail}
              />
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <Button label="Load Data" onClick={getUser} />
            <Button label="Add" onClick={toUserForm} />
          </div>
          <Table>
            <thead>
              <tr>
                <HDR value="ID" />
                <HDR value="รหัส" />
                <HDR value="ชื่อ-นามสกุล" />
                <HDR value="อีเมล์" />
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100" />
              </tr>
            </thead>
            <tbody>
              {user.data.map((m) => (
                <tr key={m.id}>
                  <Col value={m.id.toString()} />
                  <Col value={m.code} />
                  <Col value={m.name} />
                  <Col value={m.email} />
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                    <button
                      type="button"
                      className="inline-block text-gray-500 hover:text-gray-700"
                      onClick={() => setSelectdUser(m)}
                    >
                      <TrashIcon
                        className="block h-6 w-6 text-red-400 hover:text-red-700"
                        aria-hidden="true"
                      />
                    </button>
                    <button
                      className="px-2"
                      onClick={() => toEditUserForm(m.id)}
                    >
                      <PencilSquareIcon
                        className="block h-6 w-6 text-yellow-400 hover:text-yellow-700"
                        aria-hidden="true"
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={5}>
                  <Pagination
                    offset={offset}
                    limit={limit}
                    total={user.total}
                    rows={user.data.length}
                    onNext={() => changePage(offset + limit)}
                    onBack={() => changePage(offset - limit)}
                    onPageChange={(p) => changePage(limit * (p - 1))}
                  />
                </td>
              </tr>
            </tfoot>
          </Table>
          <ConfirmDialog
            title="กรุณายืนยันการทำรายการ"
            message={`คุณต้องการลบ ${selectdUser?.name} ใช่หรือไม่ `}
            cancelLabel="ไม่ใช่"
            confirmLabel="ใช่"
            confirm={() => {
              if (selectdUser) {
                delUser(selectdUser.id);
              }
              setSelectdUser(undefined);
            }}
            onClose={() => {
              setSelectdUser(undefined);
            }}
            open={!!selectdUser}
          />
        </Panel>
      ) : (
        <Navigate to="/login" />
      )}
    </Fragment>
  );
};

export { User };
