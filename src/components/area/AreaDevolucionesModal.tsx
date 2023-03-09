import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";

import { setDevolucionesModal } from "@/redux/reducers/devolucion";

// Components
import { formatTime } from "@/utils/dateFormat";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { MultiSelect } from "primereact/multiselect";
import {
  AccordionDevolucionBody,
  AccordionDevolucionHeader,
} from "../shared/AccordionDevolucion";
import Card from "../shared/Card";
import StopWatch from "../stopWatch/StopWatch";

function AreaDevolucionesModal(props: any) {
  const dispatch = useAppDispatch();

  const { devoluciones, devolucionesModal } = useAppSelector(
    (state) => state.devolucion
  );

  const renderHeader = () => {
    return (
      <div className="card flex justify-content-between align-items-center my-2 shadow-1">
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
          <Accordion className="card shadow-1">
            {devolucionesModal.map((i: any) => (
              <AccordionTab
                key={i._id}
                header={<AccordionDevolucionHeader {...i} />}
                headerClassName={`w-full ${
                  i.endedAt ? "bg-green-100" : "bg-pink-100"
                }`}
              >
                <AccordionDevolucionBody buttons {...i} />
              </AccordionTab>
            ))}
          </Accordion>

          <div>
            <Card title="Tiempo de devoluciones" height="">
              <div className="text-6xl lh-2 font-bold text-orange-300 text-center">
                <StopWatch
                  time={devolucionesModal ? formatTime(devolucionesModal) : 0}
                  pause
                />
              </div>
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
