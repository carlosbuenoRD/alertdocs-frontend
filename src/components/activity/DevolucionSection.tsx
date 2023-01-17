import React from "react";
import { Accordion } from "primereact/accordion";
import { AccordionTab } from "primereact/accordion";
import { Checkbox } from "primereact/checkbox";

function DevolucionSection() {
  return (
    <>
      <Accordion>
        <AccordionTab header="Hector Torres Mejia ----- 27/10/2022 | 11:32am">
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
      </Accordion>
    </>
  );
}

export default DevolucionSection;
