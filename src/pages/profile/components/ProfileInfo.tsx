import { FC } from "react";

// State
import { useAppSelector } from "@/redux/store";
import { ProfileState } from "../context/ProfileContext";

// Components
import Card from "@/components/shared/Card";
import { Avatar } from "primereact/avatar";

export interface ProfileInfoProps {
  user: any;
}

const ProfileInfo: FC<ProfileInfoProps> = ({ user }) => {
  const { activities } = ProfileState();

  return (
    <Card title="" height="" className="flex">
      <div className="flex flex-column justify-content-center align-items-center w-full">
        <Avatar
          image="/assets/images/mypic.png"
          shape="circle"
          className="w-8rem h-8rem shadow-2"
        />
        <h4 className="mt-3 uppercase text-center">{user?.name}</h4>
        <div className="flex">
          <h6 className="m-0 uppercase text-sm text-center text-500">
            Dirección de Recursos Humanos --
          </h6>
          <h6 className="m-0 uppercase text-sm text-center text-500">
            - Auxiliar de Recursos Humanos
          </h6>
        </div>
      </div>

      <div className="w-fit">
        {/* Estadisticas */}
        <ul className="border-1 m-0 border-50 card flex flex-column p-4 text-center">
          <li className="flex flex-column m-0">
            <h4 className="mb-1">
              {activities?.filter((i: any) => i.state === "completed").length}
            </h4>
            <h6 className="uppercase text-sm m-0 mt-2">Completados</h6>
          </li>
          <li className="w-full my-2 p-3 flex flex-column m-0 border-y-1 border-100">
            <h4 className="mb-1">{0}</h4>
            <h6 className="uppercase text-sm m-0 mt-2">Retrasados</h6>
          </li>
          <li className="flex flex-column m-0">
            <h4 className="mb-1">0</h4>
            <h6 className="uppercase text-sm m-0 mt-2">Devoluciones</h6>
          </li>
        </ul>
      </div>
    </Card>
  );
};

export default ProfileInfo;
