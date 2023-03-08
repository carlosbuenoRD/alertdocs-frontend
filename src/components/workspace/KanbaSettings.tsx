import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React from "react";

function KanbaSettings() {
  return (
    <div className="grid-1-3">
      <div className="border-right-1 border-100"></div>
      <div>
        <div>
          <div className="flex flex-column gap-2 mb-4">
            <label htmlFor="descripcion">Descripcion</label>
            <InputText id="descripcion" />
          </div>
        </div>
        <div className="text-center">
          <Button label="Eliminar" className="btn-red w-12 h-3rem" />
        </div>
      </div>
    </div>
  );
}

export default KanbaSettings;
