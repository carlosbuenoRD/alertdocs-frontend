import React, { useState } from "react";

// Components
import PieChart from "@/components/charts/PieChart";
import ProcessHeader from "@/components/proceso/ProcessHeader";
import Card from "@/components/shared/Card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import CreateModal from "@/components/proceso/CreateModal";

function Procesos(props: any) {
  const actionTemplate = (data: any) => (
    <div className="flex">
      <Button
        className="p-button-text"
        icon="pi pi-eye"
        // onClick={() => handleDetailModal(data._id)}
      ></Button>
      {/* <DeleteDialog number={data._id} confirm={deleteFlujo} /> */}
    </div>
  );

  return (
    <div className="relative">
      <ProcessHeader />
      <div className="pt-7 grid-3-1">
        <Card title="Lista de procesos" height="">
          <div>
            <DataTable
              value={props.flujos}
              paginator
              className="p-datatable-gridlines h-full"
              showGridlines
              rows={6}
              dataKey="id"
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
    </div>
  );
}

export default Procesos;
