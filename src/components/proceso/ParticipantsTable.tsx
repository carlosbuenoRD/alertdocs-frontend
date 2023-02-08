import React, { useState, useEffect } from "react";

// Services
// import FlujoService from "@/services/FlujoService";

// Components
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { getUserEficiencia } from "@/utils/formula";
import { getResultByUserAndFlujo } from "@/services/result";
import ProfileCard from "../shared/ProfileCard";

function ParticipantsTable(props: any) {
  const { flujo } = useAppSelector((state) => state.flujos);
  const { user } = useAppSelector((state) => state.auth);

  const [showProfile, setShowProfile] = useState<any>(false);
  const [selectedUser, setSelectedUser] = useState<any>("");

  const DisplayEficiencia = (props: any) => {
    const [eficiencia, setEficiencia] = useState<any>(0);
    console.log(props);
    useEffect(() => {
      getAndSetEficiencia();
    }, []);

    const getAndSetEficiencia = async () => {
      let result = await getResultByUserAndFlujo(flujo._id, props.user);
      setEficiencia(result);
    };

    return <p>{Math.floor(eficiencia) || 0}</p>;
  };

  return (
    <div>
      <DataTable
        value={flujo.participants || []}
        paginator
        className="p-datatable-gridlines"
        showGridlines
        rows={10}
        dataKey="_id"
        responsiveLayout="scroll"
        emptyMessage="No customers found."
        onRowClick={(data) => {
          setSelectedUser(data.data._id);
          setShowProfile(true);
        }}
      >
        <Column header="Nombre" field="name" style={{ minWidth: "12rem" }} />
        <Column
          header="Tareas"
          body={(data) => (
            <p>
              {flujo.activitiesSchema
                ?.map(
                  (a: any) =>
                    a.usersId.filter((u: any) => u._id === data._id).length
                )
                .reduce((acc, curr) => acc + curr, 0)}
            </p>
          )}
          style={{ minWidth: "10rem" }}
        />
        <Column
          header="Eficiencia"
          body={(data) => <DisplayEficiencia user={data._id} />}
        />
      </DataTable>

      <ProfileCard
        show={showProfile}
        onClose={() => setShowProfile(false)}
        userId={selectedUser}
      />
    </div>
  );
}

export default ParticipantsTable;
