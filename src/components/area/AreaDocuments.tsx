import React from "react";

// Components
import Card from "../shared/Card";

function AreaDocuments() {
  return (
    <Card title="Documentos" height="31rem" className="flex-1" hover>
      <div className="mt-7 text-center flex flex-column justify-content-center">
        <img
          src="/assets/images/undraw_add_files_re_v09g.svg"
          className="w-13rem mx-auto"
          alt="Add document"
        />
        <h3 className="uppercase text-lg">No tienes documentos</h3>
      </div>
    </Card>
  );
}

export default AreaDocuments;
