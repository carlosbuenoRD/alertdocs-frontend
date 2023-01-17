import React, { useState } from "react";

// Components
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { RadioButton } from "primereact/radiobutton";

function PauseModal(props: any) {
  const [value, setValue] = useState("");
  const [options, setOptions] = useState("");

  const footer = () => (
    <>
      <Button label="Cancelar" className="btn-red" onClick={props.onHide} />
      <Button
        label="Guardar"
        onClick={() => {
          props.action();
          props.onHide();
        }}
      />
    </>
  );

  return (
    <Dialog
      header="Justificacion de pausa"
      visible={props.visible}
      modal={false}
      style={{ width: "30vw" }}
      footer={() => footer()}
      onHide={props.onHide}
    >
      <div className="mt-2 flex flex-column">
        <label className="mb-3">Opciones</label>
        <div className="field-radiobutton">
          <RadioButton
            inputId="almuerzo"
            name="city"
            value="Hora de almuerzo"
            onChange={(e) => setOptions(e.value)}
            checked={options.includes("almuerzo")}
          />
          <label htmlFor="almuerzo">Hora de almuezo</label>
        </div>
        <div className="field-radiobutton">
          <RadioButton
            inputId="laboral"
            name="city"
            value="Fin de jornada laboral"
            onChange={(e) => setOptions(e.value)}
            checked={options.includes("laboral")}
          />
          <label htmlFor="laboral">Fin de jornada laboral</label>
        </div>
        <div className="field-radiobutton">
          <RadioButton
            inputId="justificacion"
            name="city"
            value="Otra justificacion"
            onChange={(e) => setOptions(e.value)}
            checked={options.includes("justificacion")}
          />
          <label htmlFor="justificacion">Otra justificacion</label>
        </div>

        {options.includes("justificacion") && (
          <>
            <hr />
            <div className="mt-2 flex flex-column">
              <label htmlFor="comment" className="mb-1">
                Escribe tu justificacion
              </label>
              <InputTextarea
                id="comment"
                value={value}
                onChange={(e) => setValue(e.currentTarget.value)}
              />
            </div>
          </>
        )}
      </div>
    </Dialog>
  );
}

export default PauseModal;
