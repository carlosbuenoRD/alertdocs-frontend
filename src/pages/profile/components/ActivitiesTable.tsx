import { useState } from "react";

// Utils
import { dateFormat } from "@/utils/dateFormat";
import { getEficiencia } from "@/utils/formula";

// Components
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import ActivityModal from "@/components/activity/ActivityModal";
import { checkColor } from "@/utils/checkColor";

function ActivitiesTable(props: any) {
  const [activity, setActivity] = useState<any>({});
  const [activityModal, setActivityModal] = useState<any>(false);

  return (
    <>
      <div className="card p-4 pt-3 shadow-1 pt-0 mt-3">
        <DataTable
          value={props.activities}
          paginator
          className="p-datatable-customers"
          rows={10}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          rowsPerPageOptions={[10, 25, 50]}
          dataKey="id"
          rowHover
          onRowClick={({ data }) => {
            setActivity(data);
            setActivityModal(true);
          }}
          selectionMode="single"
          showGridlines
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
            body={(data: any) => {
              const eficiencia = Math.round(getEficiencia([data]));
              return (
                <h6
                  className={`${checkColor(
                    eficiencia
                  )} shadow-2 p-2 border-round-md w-5 m-0 text-white`}
                >
                  {eficiencia}
                </h6>
              );
            }}
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

        {activityModal && (
          <ActivityModal
            {...activity}
            visible={activityModal}
            onHide={() => setActivityModal(false)}
          />
        )}
      </div>
    </>
  );
}

export default ActivitiesTable;
