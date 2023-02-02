import { useEffect } from "react";
import { Accordion } from "primereact/accordion";
import { AccordionTab } from "primereact/accordion";
import { Checkbox } from "primereact/checkbox";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  endDevoluciones,
  fetchDevolucionByActivity,
} from "@/redux/reducers/devolucion";
import { dateFormat } from "@/utils/dateFormat";
import { Message } from "primereact/message";
import {
  AccordionDevolucionBody,
  AccordionDevolucionHeader,
} from "../shared/AccordionDevolucion";

function DevolucionSection() {
  const dispatch = useAppDispatch();

  const { devoluciones } = useAppSelector((state) => state.devolucion);

  useEffect(() => {
    dispatch(fetchDevolucionByActivity());
  }, []);

  const handleEndDevolucion = (id: string) => {
    dispatch(endDevoluciones(id));
  };

  return (
    <>
      {devoluciones.length > 0 ? (
        <Accordion>
          {devoluciones?.map((i: any) => (
            <AccordionTab
              key={i._id}
              header={<AccordionDevolucionHeader {...i} />}
              headerClassName={`w-full ${
                i.endedAt ? "bg-green-100" : "bg-pink-100"
              }`}
            >
              <AccordionDevolucionBody {...i} />
              {!i.endedAt && (
                <div className="w-full flex justify-content-end">
                  <button
                    className="p-button"
                    onClick={() => handleEndDevolucion(i._id)}
                  >
                    Terminar devolucion
                  </button>
                </div>
              )}
            </AccordionTab>
          ))}
        </Accordion>
      ) : (
        <Message
          severity="error"
          text="La actividad no tiene devoluciones"
          className="w-full h-3rem bg-pink-100"
        />
      )}
    </>
  );
}

export default DevolucionSection;
