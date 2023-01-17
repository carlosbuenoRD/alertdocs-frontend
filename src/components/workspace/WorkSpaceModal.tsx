import React, { useState, useEffect } from "react";

// Components
import { TabMenu } from "primereact/tabmenu";
import { Dialog } from "primereact/dialog";
import KanbaContainer from "./kanba/Container";
import { InputText } from "primereact/inputtext";
import DocumentCard from "../documents/DocumentCard";
import SectionPicker from "./SectionPicker";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchDocumentsByArea } from "@/redux/reducers/documents";
import { fetchAllDocuments } from "@/redux/reducers/documents";
import { fetchDocumentActivities } from "@/redux/reducers/activity";

function WorkSpaceModal(props: any) {
  const dispatch = useAppDispatch();

  const { documents } = useAppSelector((state) => state.document);
  const [activeIndex, setActiveIndex] = useState(0);

  const items = [
    { label: "Tabla", icon: "pi pi-clock" },
    { label: "Comentarios", icon: "pi pi-check-circle" },
    { label: "Archivos", icon: "pi pi-file" },
    { label: "Participantes", icon: "pi pi-user" },
    { label: "General", icon: "pi pi-cog" },
  ];

  useEffect(() => {
    dispatch(fetchAllDocuments());
  }, []);

  const handleSelectDocument = (document: any) => {
    dispatch(fetchDocumentActivities(document._id));
  };

  return (
    <Dialog
      header={"WorkSpace"}
      //   maximizable
      maximized
      visible={props.visible}
      style={{ width: "80vw", padding: 0 }}
      onHide={props.onHide}
      contentClassName="p-0"
    >
      <div className="workspace gap-0">
        <div className="workspace_docs card border-right-1 border-300">
          <span className="p-input-icon-left p-float-label w-full">
            <i className="pi pi-search" />
            <InputText id="search" className="w-full" />
            <label htmlFor="search">Buscar...</label>
          </span>

          <hr />

          {documents.map((i) => (
            <div key={i._id} onClick={() => handleSelectDocument(i)}>
              <DocumentCard />
            </div>
          ))}
        </div>
        <div className="card relative w-full">
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
        </div>
      </div>
    </Dialog>
  );
}

export default WorkSpaceModal;
