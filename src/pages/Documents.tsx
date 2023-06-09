import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import DocumentCard from "@/components/documents/DocumentCard";
import { TabMenu } from "primereact/tabmenu";
import SectionPicker from "@/components/workspace/SectionPicker";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useLocation } from "react-router-dom";
import { fetchDocumentActivities } from "@/redux/reducers/activity";
import { setDocument } from "@/redux/reducers/documents";

function Documents() {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const areaId = location.pathname.split("/")[2];
  const { documents, document } = useAppSelector((state) => state.document);
  const { activities } = useAppSelector((state) => state.activity);
  const [activeIndex, setActiveIndex] = useState(0);

  const items = [
    { label: "Tabla", icon: "pi pi-clock" },
    { label: "Comentarios", icon: "pi pi-check-circle" },
    { label: "Archivos", icon: "pi pi-file" },
    { label: "Participantes", icon: "pi pi-user" },
    { label: "General", icon: "pi pi-cog" },
  ];

  const handleSelectDocument = (document: any) => {
    dispatch(setDocument(document));
    dispatch(fetchDocumentActivities(document._id));
    setActiveIndex(0);
  };

  return (
    <div className="workspace gap-0">
      <div className="workspace_docs card border-right-1 border-300">
        <span className="p-input-icon-left p-float-label w-full">
          <i className="pi pi-search" />
          <InputText id="search" className="w-full" />
          <label htmlFor="search">Buscar...</label>
        </span>

        <hr />

        {documents.map((i) => (
          <div
            key={i._id}
            onClick={() => handleSelectDocument(i)}
            className={
              document._id === i._id
                ? "border-3 border-blue-400 border-round-lg mb-2"
                : "mb-2"
            }
          >
            <DocumentCard />
          </div>
        ))}
      </div>
      <div className="card relative w-full h-full">
        {activities.length > 0 ? (
          <div
            className="fixed pr-4"
            style={{ width: "-webkit-fill-available" }}
          >
            <div className="pb-0 mb-1">
              <TabMenu
                model={items}
                activeIndex={activeIndex}
                onTabChange={(e: any) => setActiveIndex(e.index)}
                className="mb-4"
                style={{ fontSize: "1.2rem" }}
              />
            </div>
            <SectionPicker index={activeIndex} />
          </div>
        ) : (
          <div className="w-full">
            <img
              src="/assets/images/selectDocument.svg"
              className="w-6 m-auto grid place-items-center"
            />
            <h2 className="uppercase text-center">Seleccione un documento</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default Documents;
