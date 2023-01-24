import React, { useState } from "react";
import { useAppSelector } from "@/redux/store";

// Components
import Card from "../shared/Card";
import WorkSpaceModal from "../workspace/WorkSpaceModal";

function AreaDocuments() {
  const { documents } = useAppSelector((state) => state.document);
  const [workspace, setWorkspace] = useState(false);

  return (
    <>
      <Card
        title="Documentos"
        height="31rem"
        className="flex-1"
        hover
        onClick={() => setWorkspace(true)}
      >
        {documents.length > 0 ? (
          <ul>
            {documents.map((i) => (
              <li
                key={i._id}
                className="card mb-2 shadow-3 flex align-items-center justify-content-between"
              >
                <p>{i.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-7 text-center flex flex-column justify-content-center">
            <img
              src="/assets/images/undraw_add_files_re_v09g.svg"
              className="w-13rem mx-auto"
              alt="Add document"
            />
            <h3 className="uppercase text-lg">No tienes documentos</h3>
          </div>
        )}
      </Card>

      {workspace && (
        <WorkSpaceModal
          visible={workspace}
          onHide={() => setWorkspace(false)}
        />
      )}
    </>
  );
}

export default AreaDocuments;
