import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React from "react";

export interface UserTableProps {}

const UserTable: React.FC<UserTableProps> = () => {
  return (
    <DataTable
      value={[
        { name: "Carlos Bueno", eficiencia: 98 },
        { name: "Carlos Bueno", eficiencia: 98 },
        { name: "Carlos Bueno", eficiencia: 98 },
        { name: "Carlos Bueno", eficiencia: 98 },
      ]}
      paginator
      className="p-datatable-customers"
      rows={5}
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      dataKey="id"
      size="large"
      rowHover
      showGridlines
      filterDisplay="menu"
      responsiveLayout="scroll"
      emptyMessage="Usuarios no encontrados."
      currentPageReportTemplate=" {first} a {last} de {totalRecords}"
      //   onRowClick={(data) => {
      //     setSelectedUser(data.data._id);
      //     setShowProfile(true);
      //   }}
    >
      <Column field="name" header="Name" style={{ minWidth: "14rem" }} />
      <Column field="name" header="Recibidas" style={{ minWidth: "14rem" }} />
      <Column
        field="name"
        header="Devoluciones"
        style={{ minWidth: "14rem" }}
      />
      <Column
        field="eficiencia"
        header="Eficiencia"
        className="text-center"
        style={{ textAlign: "center" }}
        filterPlaceholder="Search by country"
      />
    </DataTable>
  );
};

export default UserTable;
