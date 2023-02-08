import React from "react";
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { dateFormat } from "@/utils/dateFormat";
import { getEficiencia } from "@/utils/formula";

function ActivitiesTable(props: any) {
  return (
    <>
      <div className="card shadow-1 pt-0 mt-3">
        <DataTable
          value={props.activities}
          paginator
          className="p-datatable-customers"
          rows={10}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          rowsPerPageOptions={[10, 25, 50]}
          dataKey="id"
          rowHover
          selectionMode="single"
          dragSelection
          // selection={selectedCustomers}
          // onSelectionChange={(e) => handleOnSelectUser(e)}
          filterDisplay="menu"
          // loading={loading}
          responsiveLayout="scroll"
          emptyMessage="Actividades no encontradas."
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
          // onRowClick={(data) => {
          //   setSelectedUser(data.data._id);
          //   setShowProfile(true);
          // }}
        >
          <Column
            field="description"
            header="Descripcion"
            sortable
            filterPlaceholder="Search by name"
            // style={{ minWidth: "14rem" }}
          />
          <Column
            field="_id"
            header="Eficiencia"
            sortable
            className="text-left"
            filterField="users.name"
            // style={{ minWidth: "14rem" }}
            filterPlaceholder="Search by country"
            body={(data: any) => (
              <h6 className="bg-green-400 shadow-2 p-2 border-round-md w-5 m-0 text-white">
                {Math.round(getEficiencia([data]))}
              </h6>
            )}
          />
          <Column
            field="endedAt"
            header="Fecha"
            sortable
            filterField="date"
            dataType="date"
            // style={{ minWidth: "8rem" }}
            body={(data: any) => (
              <p>{dateFormat(new Date(data.endedAt), "date")}</p>
            )}
          />
          <Column
            field="endedAt"
            header="Hora"
            sortable
            filterMenuStyle={{ width: "14rem" }}
            // style={{ minWidth: "10rem" }}
            body={(data: any) => (
              <p>{dateFormat(new Date(data.endedAt), "time")}</p>
            )}
          />
        </DataTable>
      </div>
    </>
  );
}

export default ActivitiesTable;
