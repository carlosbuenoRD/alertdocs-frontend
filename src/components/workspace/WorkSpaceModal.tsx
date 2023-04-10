import { useEffect, useState } from "react";

// Components
import {
  clearActivities,
  fetchDocumentActivities,
} from "@/redux/reducers/activity";
import {
  clearDocument,
  fetchCompletedDocumentsByDepartments,
  fetchCompletedDocumentsByDireccion,
  fetchDocumentsByArea,
  fetchDocumentsByDepartments,
  fetchDocumentsByDireccion,
  fetchOneDocument,
  setDocument,
  setDocumentsList,
  setHistoryDocumentsList,
} from "@/redux/reducers/documents";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import kanbaSocket from "@/sockets/kanba.socket";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { TabMenu } from "primereact/tabmenu";
import { useLocation } from "react-router-dom";
import DocumentCard from "../documents/DocumentCard";
import { fetchCompletedDocumentsByArea } from "./../../redux/reducers/documents";
import SectionPicker from "./SectionPicker";

function WorkSpaceModal(props: any) {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const areaId = location.pathname.split("/")[2];
  const section = location.pathname.split("/")[1];

  const { documents, document, historyDocuments } = useAppSelector(
    (state) => state.document
  );
  const { activities } = useAppSelector((state) => state.activity);
  const { user } = useAppSelector((state) => state.auth);

  const [activeIndex, setActiveIndex] = useState(0);
  const [history, setHistory] = useState(false);
  const [search, setSearch] = useState("");

  const items = [
    { label: "Tabla", icon: "pi pi-clock" },
    { label: "Comentarios", icon: "pi pi-check-circle" },
    { label: "Archivos", icon: "pi pi-file" },
    { label: "Participantes", icon: "pi pi-user" },
    { label: "General", icon: "pi pi-cog" },
  ];

  useEffect(() => {
    if (!props.fromActivity) {
      if (section === "area") dispatch(fetchDocumentsByArea(areaId));
      if (section === "direcciones")
        dispatch(fetchDocumentsByDireccion(areaId));
      if (section === "departments")
        dispatch(fetchDocumentsByDepartments(areaId));
    }
  }, [section]);

  useEffect(() => {
    if (props.fromActivity) {
      dispatch(fetchOneDocument(props.fromActivity));
      dispatch(fetchDocumentActivities(props.fromActivity));
    }
  }, [props.fromActivity]);

  useEffect(() => {
    if (props.fromActivity && document) {
      dispatch(setDocumentsList([document]));
    }
  }, [document]);

  const handleSelectDocument = (document: any) => {
    dispatch(setDocument(document));
    dispatch(fetchDocumentActivities(document._id));
    setActiveIndex(0);

    kanbaSocket.emit("join document", document._id);
  };

  const handleOnHide = () => {
    dispatch(clearActivities(""));
    dispatch(clearDocument(""));
    props.onHide();
  };

  const handleHistorySection = () => {
    setHistory(!history);

    if (!history) {
      if (section === "area") dispatch(fetchCompletedDocumentsByArea(areaId));
      if (section === "direcciones")
        dispatch(fetchCompletedDocumentsByDireccion(areaId));
      if (section === "departments")
        dispatch(fetchCompletedDocumentsByDepartments(areaId));
    }

    if (history) dispatch(setHistoryDocumentsList([]));
  };

  let OPTIONS = history ? historyDocuments : documents;

  let DOCUMENTS = search
    ? OPTIONS.filter((i) =>
        i.description.toLowerCase().includes(search.toLowerCase())
      )
    : OPTIONS;

  return (
    <Dialog
      header={"WorkSpace"}
      //   maximizable
      maximized
      visible={props.visible}
      style={{ width: "80vw", padding: 0 }}
      onHide={handleOnHide}
      contentClassName="p-0"
    >
      <div className={`workspace gap-0 transition-all transition-duration-500`}>
        <div
          className={` ${
            !history ? "w-28rem" : "w-12"
          } transition-all transition-duration-500 card border-right-1 border-300`}
        >
          <div className="flex justify-content-between">
            <span className="p-input-icon-left p-float-label w-11 mr-2">
              <i className="pi pi-search" />
              <InputText
                id="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-12"
              />
              <label htmlFor="search">Buscar...</label>
            </span>

            {history && (
              <Calendar className="w-4 mr-1" placeholder="Filtrar por fecha" />
            )}

            <Button
              icon={`pi ${!history ? "pi-history" : "pi-times-circle"}`}
              className={`${history && "bg-pink-400 border-none"} w-4rem`}
              tooltip={history ? "Cerrar historial" : "Ver historial"}
              onClick={handleHistorySection}
            />
          </div>

          <hr />

          <div className={`${history && "grid-col-2"}`}>
            {documents?.map((i, index: number) => (
              <div
                key={index}
                onClick={() => handleSelectDocument(i)}
                className={
                  document._id === i._id
                    ? "border-3 border-blue-400 border-round-lg mb-2"
                    : "mb-2"
                }
              >
                <DocumentCard {...i} />
              </div>
            ))}
          </div>
        </div>
        <div className="card relative w-full transition-all transition-duration-500">
          {activities?.length > 0 ? (
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
    </Dialog>
  );
}

export default WorkSpaceModal;
