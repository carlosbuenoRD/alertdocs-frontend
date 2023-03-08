import React, { useState, useEffect, useCallback } from "react";

// Components
import PieChart from "@/components/charts/PieChart";
import ProcessHeader from "@/components/proceso/ProcessHeader";
import Card from "@/components/shared/Card";
import DetailModal from "@/components/proceso/DetailModal";
import MyConfirmPopup from "@/components/shared/MyConfirmPopup";
import LineChart from "@/components/charts/LineChart";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useAppSelector, useAppDispatch } from "@/redux/store";
import { fetchAllFlujos, deleteFlujo } from "@/redux/reducers/flujos";
import { getActivitiesByFlujo } from "@/services/activity";
import { getEficiencia } from "@/utils/formula";

function Procesos(props: any) {
  const dispatch = useAppDispatch();
  const { flujos } = useAppSelector((state) => state.flujos);

  const [detailModal, setDetailModal] = useState(false);
  const [detailNumber, setDetailNumber] = useState<any>("");

  const [search, setSearch] = useState("");

  const handleDetailModal = (number: any) => {
    setDetailNumber(number);
    setDetailModal(true);
  };

  const actionTemplate = (data: any) => {
    return (
      <div className="flex">
        <Button
          className="p-button-text text-blue-400"
          icon="pi pi-eye"
          onClick={() => handleDetailModal(data._id)}
        ></Button>
        <MyConfirmPopup
          message="Estas seguro de eliminar el flujo?"
          iconButton="pi pi-trash text-pink-400"
          className="p-button-text"
          accept={() => dispatch(deleteFlujo(data._id))}
        />
      </div>
    );
  };

  useEffect(() => {
    dispatch(fetchAllFlujos());
  }, []);

  const ShowEficiencia = (props: any) => {
    const [eficiencia, setEficiencia] = useState(0);

    useEffect(() => {
      handleEficiencia();
    }, [props]);

    const handleEficiencia = async () => {
      let result = await getActivitiesByFlujo(props.id);
      if (result) setEficiencia(getEficiencia(result));
    };

    return <p>{Math.floor(eficiencia) || 0}</p>;
  };

  const currentFlujos = search
    ? flujos.filter((i) => i.description.includes(search))
    : flujos;

  return (
    <div className="relative">
      <ProcessHeader searchKit={{ search, setSearch }} />
      <div className="pt-7 grid-3-1">
        <Card title="Lista de procesos">
          <div>
            <DataTable
              value={currentFlujos}
              paginator
              className="p-datatable-gridlines h-full"
              showGridlines
              rows={4}
              dataKey="_id"
              responsiveLayout="scroll"
              emptyMessage="No customers found."
            >
              <Column header="No." field="_id" style={{ minWidth: "2rem" }} />
              <Column
                header="Descripcion"
                field="description"
                style={{ minWidth: "12rem" }}
              />
              <Column
                header="Eficiencia"
                field="description"
                body={(data) => <ShowEficiencia id={data._id} />}
                // style={{ minWidth: "12rem" }}
              />
              <Column
                align={"center"}
                headerStyle={{ width: "8em" }}
                bodyStyle={{ textAlign: "center" }}
                body={(data) => actionTemplate(data)}
              ></Column>
            </DataTable>
          </div>
        </Card>
        <Card title="Mas usados" height="fit">
          <PieChart />
        </Card>
      </div>

      <Card title="Ultimos 6 meses">
        <LineChart />
      </Card>

      <DetailModal
        visible={detailModal}
        onHide={() => setDetailModal(false)}
        id={detailNumber}
      />
    </div>
  );
}

export default Procesos;
