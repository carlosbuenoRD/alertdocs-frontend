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
import { Accordion } from "primereact/accordion";
import { AccordionTab } from "primereact/accordion";
import { Checkbox } from "primereact/checkbox";
import Card from "../shared/Card";

function AreaDevolucionesModal(props: any) {
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
      <div className="card flex justify-content-between align-items-center my-2">
        <div className="flex align-items-center">
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText value="" placeholder="Keyword Search" />
          </span>
          <div className="p-float-label ml-3">
            <MultiSelect
              display="chip"
              optionLabel="name"
              // value={selectedCities}
              // options={cities}
              // onChange={(e) => setSelectedCities(e.value)}
              className="w-24rem"
            />
            <label htmlFor="search">Filtro de procesos</label>
          </div>
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
        header={"Devoluciones"}
        visible={props.visible}
        style={{ width: "80vw", padding: 0 }}
        onHide={props.onHide}
      >
        {header}

        <div className="grid-3-1">
          <Accordion className="card">
            {Array.from(Array(10)).map((i) => (
              <AccordionTab
                key={i}
                className=" mb-1"
                header="Hector Torres Mejia ----- 27/10/2022 | 11:32am"
              >
                <p>
                  Faltaron requisitos de informacion para la continuacion del
                  documento
                </p>
                <div>
                  <div className="col-12">
                    <Checkbox inputId="cb1" value="New York"></Checkbox>
                    <label htmlFor="cb1" className="p-checkbox-label ml-2">
                      Agregar fecha de finalizacion
                    </label>
                  </div>
                  <div className="col-12">
                    <Checkbox inputId="cb2" value="San Francisco"></Checkbox>
                    <label htmlFor="cb2" className="p-checkbox-label ml-2">
                      Agregar cupones de ventas
                    </label>
                  </div>
                  <div className="col-12">
                    <Checkbox inputId="cb3" value="Los Angeles"></Checkbox>
                    <label htmlFor="cb3" className="p-checkbox-label ml-2">
                      Firma de representante faltante
                    </label>
                  </div>
                </div>
              </AccordionTab>
            ))}
          </Accordion>

          <div>
            <Card title="Tiempo de devoluciones" height="">
              <h1 className="text-6xl lh-2 font-bold text-orange-300 text-center">
                2:25:12
              </h1>
            </Card>
            <Card title="Deficit en devoluciones" height="">
              <ul>
                <li className="flex justify-content-between align-items-center">
                  <div className="flex justify-content-between align-items-center">
                    <span>Baldomero Ferrer</span>
                  </div>
                  <span>25%</span>
                </li>
                <li className="flex justify-content-between align-items-center my-1">
                  <div className="flex justify-content-between align-items-center">
                    <span>Josefa Castillo</span>
                  </div>
                  <span>20%</span>
                </li>
                <li className="flex justify-content-between align-items-center">
                  <div className="flex justify-content-between align-items-center">
                    <span>Abrahán González</span>
                  </div>
                  <span>17%</span>
                </li>
                <li className="flex justify-content-between align-items-center my-1">
                  <div className="flex justify-content-between align-items-center">
                    <span>Arcadio Muñoz</span>
                  </div>
                  <span>15%</span>
                </li>
                <li className="flex justify-content-between align-items-center">
                  <div className="flex justify-content-between align-items-center">
                    <span>Roberto Ortega</span>
                  </div>
                  <span>10%</span>
                </li>
                <li className="flex justify-content-between align-items-center my-1">
                  <div className="flex justify-content-between align-items-center">
                    <span>Almudena Fuentes</span>
                  </div>
                  <span>8%</span>
                </li>
                <li className="flex justify-content-between align-items-center">
                  <div className="flex justify-content-between align-items-center">
                    <span>Eduardo Reyes</span>
                  </div>
                  <span>5%</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default AreaDevolucionesModal;
