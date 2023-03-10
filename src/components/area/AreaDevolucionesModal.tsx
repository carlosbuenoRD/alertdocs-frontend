import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useEffect, useState } from "react";

// Components
import { formatTime } from "@/utils/dateFormat";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import {
  AccordionDevolucionBody,
  AccordionDevolucionHeader,
} from "../shared/AccordionDevolucion";
import Card from "../shared/Card";
import StopWatch from "../stopWatch/StopWatch";

function AreaDevolucionesModal(props: any) {
  const dispatch = useAppDispatch();

  const [users, setUsers] = useState<any[]>([]);

  const { devolucionesModal } = useAppSelector((state) => state.devolucion);

  useEffect(() => {
    handleUsersDevoluciones();
  }, []);

  const handleUsersDevoluciones = () => {
    let p: any[] = [];

    let users = new Set<string>();

    devolucionesModal.map((i: any) => {
      users.add(i.userTo.name);
    });

    Array.from(users).map((item, i) => {
      if (i === 0) {
        p = [
          {
            name: item,
            qty: devolucionesModal.filter((i: any) => i.userTo.name === item)
              .length,
          },
        ];
      } else {
        p.push({
          name: item,
          qty: devolucionesModal.filter((i: any) => i.userTo.name === item)
            .length,
        });
      }
    });

    setUsers(p);
  };

  return (
    <>
      <Dialog
        header={"Devoluciones"}
        visible={props.visible}
        style={{ width: "80vw", padding: 0 }}
        onHide={props.onHide}
      >
        <div className="card flex justify-content-between align-items-center my-2 shadow-1">
          <div className="flex align-items-center">
            <span className="p-input-icon-left">
              <i className="pi pi-search" />
              <InputText value="" placeholder="Keyword Search" />
            </span>
            {/* <div className="p-float-label ml-3">
            <MultiSelect
              display="chip"
              optionLabel="name"
              // value={selectedCities}
              // options={cities}
              // onChange={(e) => setSelectedCities(e.value)}
              className="w-24rem"
            />
            <label htmlFor="search">Filtro de procesos</label>
          </div> */}
          </div>
        </div>

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
            <Card title="Usuarios con devoluciones" height="">
              <ul className="m-0">
                {users.map((i: any) => (
                  <>
                    <li className="flex justify-content-between align-items-center mb-0 py-1">
                      <div className="flex justify-content-between align-items-center">
                        <span>{i.name}</span>
                      </div>
                      <span>{i.qty}</span>
                    </li>
                  </>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default AreaDevolucionesModal;
