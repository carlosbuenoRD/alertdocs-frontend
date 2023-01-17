import React, { useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

function CommentSection() {
  const dt = useRef<any>(null);

  return (
    <div className="card">
      <DataTable
        className="p-datatable-customers"
        ref={dt}
        value={[]}
        dataKey="_id"
        rowHover
        rows={10}
        responsiveLayout="scroll"
        rowsPerPageOptions={[10, 20, 30, 50]}
        paginator
      >
        <Column field="_id" header="#" style={{ minWidth: "4rem" }}></Column>
        <Column field="activityId.step" header="Paso"></Column>
        <Column field="userId.name" header="Usuario" align="center"></Column>
        <Column field="text" header="Comentario" sortable></Column>
        <Column
          field="createdAt"
          header="Fecha"
          sortable
          //   body={(data) => <p>1/5/2023</p>}
        ></Column>
      </DataTable>
    </div>
  );
}

export default CommentSection;
