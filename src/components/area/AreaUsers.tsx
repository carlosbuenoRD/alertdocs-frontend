import { useState, useEffect } from "react";
import { useAppSelector } from "@/redux/store";

// Components
import Card from "../shared/Card";
import UsersModal from "./UsersModal";
import { getUserEficiencia } from "@/utils/formula";

function UsersCard(props: any) {
  const [eficiencia, setEficiencia] = useState<any>(0);
  useEffect(() => {
    getAndSetEficiencia();
  }, []);

  const getAndSetEficiencia = async () => {
    let result = await getUserEficiencia(props._id);
    setEficiencia(result);
  };

  return (
    <li
      key={props._id}
      className="card p-2 px-3 shadow-1 flex justify-content-between align-items-center bg-blue-100 mb-2"
    >
      <p className="uppercase lh-1 font-medium text-sm m-0">{props.name}</p>
      <h4 className="m-0 lh-2">{Math.floor(eficiencia) || 0}</h4>
    </li>
  );
}

function AreaUsers() {
  const { users } = useAppSelector((state) => state.user);

  const [userModal, setUserModal] = useState(false);

  const onHideUserModal = () => setUserModal(false);

  return (
    <>
      <Card
        title="Usuarios - Top 4"
        height="fit"
        className="bg-blue-50"
        hover
        onClick={() => setUserModal(true)}
      >
        <ul className="mb-0" style={{ height: "--" }}>
          {users?.length > 0 ? (
            users.slice(0, 4).map((u: any) => <UsersCard key={u._id} {...u} />)
          ) : (
            <p>No tienes usuarios activos</p>
          )}
        </ul>
      </Card>
      <UsersModal visible={userModal} onHide={onHideUserModal} />
    </>
  );
}

export default AreaUsers;
