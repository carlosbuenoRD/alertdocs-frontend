import React, { useState, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/redux/store";

// Components
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputTextarea } from "primereact/inputtextarea";
import { MultiSelect } from "primereact/multiselect";
import { AddRemoveUser } from "@/redux/reducers/users";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { getResultByUser } from "@/services/result";
import { getUserEficiencia } from "@/utils/formula";
import { InputText } from "primereact/inputtext";

function UsersModal(props: any) {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.flujos);
  const { users } = useAppSelector((state) => state.user);

  const [selectedCustomers, setSelectedCustomers] = useState<any>([]);

  const DisplayEficiencia = (props: any) => {
    const [eficiencia, setEficiencia] = useState<any>(0);

    useEffect(() => {
      getAndSetEficiencia();
    }, []);

    const getAndSetEficiencia = async () => {
      let result = await getUserEficiencia(props.id);
      setEficiencia(result);
    };

    return <p>{Math.floor(eficiencia) || 0}</p>;
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-between align-items-center">
        <h5 className="m-0">Usuarios</h5>
        <div className="flex align-items-center">
          <div className="p-float-label mr-3">
            <MultiSelect
              display="chip"
              optionLabel="name"
              // value={selectedCities}
              // options={cities}
              // onChange={(e) => setSelectedCities(e.value)}
              className="w-24rem"
            />
            <label htmlFor="search">Filtro de Departamentos</label>
          </div>
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText value="" placeholder="Keyword Search" />
          </span>
        </div>
      </div>
    );
  };

  const header = renderHeader();
  const handleOnSelectUser = (e: any) => {
    setSelectedCustomers(e.value);
    dispatch(AddRemoveUser(e.value[e.value.length - 1]));
  };

  return (
    <>
      <Dialog
        header={"Usuarios"}
        visible={props.visible}
        style={{ width: "80vw", padding: 0 }}
        onHide={props.onHide}
      >
        <DataTable
          value={users}
          paginator
          className="p-datatable-customers"
          header={header}
          rows={10}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          rowsPerPageOptions={[10, 25, 50]}
          dataKey="id"
          rowHover
          selection={selectedCustomers}
          onSelectionChange={(e) => handleOnSelectUser(e)}
          // filters={filters}
          filterDisplay="menu"
          loading={loading}
          responsiveLayout="scroll"
          emptyMessage="Usuarios no encontrados."
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        >
          <Column
            selectionMode="multiple"
            // selectionAriaLabel="name"
            headerStyle={{ width: "3em" }}
          ></Column>
          <Column
            field="name"
            header="Name"
            sortable
            filter
            filterPlaceholder="Search by name"
            style={{ minWidth: "14rem" }}
          />
          <Column
            field="_id"
            header="Eficiencia"
            sortable
            className="text-left"
            filterField="users.name"
            style={{ minWidth: "14rem" }}
            filter
            filterPlaceholder="Search by country"
            body={(data: any) => <DisplayEficiencia id={data._id} />}
          />
          <Column
            field="cargo"
            header="Cargo"
            sortable
            filterField="date"
            dataType="date"
            style={{ minWidth: "8rem" }}
            filter
          />
          <Column
            field="isAdmin"
            header="administrador"
            sortable
            filterMenuStyle={{ width: "14rem" }}
            style={{ minWidth: "10rem" }}
            filter
            body={(data) => (
              <div
                className={`w-2rem h-2rem border-round-md ${
                  data.isAdmin === true ? "bg-green-400" : "bg-pink-400"
                }`}
              ></div>
            )}
          />
          <Column
            headerStyle={{ width: "4rem", textAlign: "center" }}
            bodyStyle={{ textAlign: "center", overflow: "visible" }}
            body={() => <Button type="button" icon="pi pi-cog"></Button>}
          />
        </DataTable>
      </Dialog>
    </>
  );
}

export default UsersModal;
