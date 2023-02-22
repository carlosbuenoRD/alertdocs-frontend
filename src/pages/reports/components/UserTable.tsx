import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React from "react";

export interface UserTableProps {}

const UserTable: React.FC<UserTableProps> = () => {
  return (
    <DataTable
      value={[
        { name: "Carlos Bueno", eficiencia: 98, r: 12, d: 2 },
        { name: "Carlos Bueno", eficiencia: 98, r: 12, d: 2 },
        { name: "Carlos Bueno", eficiencia: 98, r: 12, d: 2 },
        { name: "Carlos Bueno", eficiencia: 98, r: 12, d: 2 },
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
      <Column
        field="r"
        header="Recibidas"
        className="text-center"
        alignHeader={"center"}
        style={{ maxWidth: "5rem" }}
      />
      <Column
        field="d"
        header="Devoluciones"
        className="text-center"
        alignHeader={"center"}
        style={{ maxWidth: "5rem" }}
      />
      <Column
        field="eficiencia"
        header="Eficiencia"
        className="text-center"
        alignHeader={"center"}
        style={{ textAlign: "center" }}
        filterPlaceholder="Search by country"
      />
    </DataTable>
  );
};

export default UserTable;
