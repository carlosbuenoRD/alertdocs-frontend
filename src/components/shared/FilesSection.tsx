import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf/dist/esm/entry.vite";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

import pdfjsWorker from "pdfjs-dist/build/pdf.worker?url";

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

// Components
import { Accordion } from "primereact/accordion";
import { AccordionTab } from "primereact/accordion";
import { Image } from "primereact/image";
import MyConfirmPopup from "./MyConfirmPopup";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  fetchFilesByActivities,
  fetchFilesByDocuments,
  removeFileAction,
} from "@/redux/reducers/files";

const files: any[] = [];

function FilesSection(props: any) {
  const dispatch = useAppDispatch();

  const { activity } = useAppSelector((state) => state.activity);
  const { files } = useAppSelector((state) => state.files);

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }: any) {
    setNumPages(numPages);
  }

  useEffect(() => {
    props.general
      ? dispatch(fetchFilesByDocuments())
      : dispatch(fetchFilesByActivities());
  }, []);

  const handleRemoveFile = (id: string) => {
    dispatch(removeFileAction(id));
  };

  return (
    <>
      <Accordion className="w-full">
        <AccordionTab header="Archivos">
          <div className="grid-col-4">
            {files.map((i: any) => (
              <div key={i._id}>
                {i.file.split(".")[1] === "pdf" && (
                  <div className="relative">
                    <div className="absolute z-5 right-0 -top-5 overflow-hidden">
                      <MyConfirmPopup
                        message="Estas seguro de borrar el archivo?"
                        iconButton="pi pi-trash"
                        accept={() => handleRemoveFile(i._id)}
                        className="bg-pink-400 border-none w-2rem"
                      />
                    </div>
                    <a
                      href={`http://localhost:3000/uploads/${i.file}`}
                      target="_blank"
                      className="relative"
                    >
                      <Document
                        file={`http://localhost:3000/uploads/${i.file}`}
                        onLoadSuccess={onDocumentLoadSuccess}
                        className="cursor-pointer"
                      >
                        <Page
                          pageNumber={pageNumber}
                          width={200}
                          height={150}
                        />
                      </Document>
                      <p className="font-bold">
                        Copia de requisitos de solicitud
                      </p>
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </AccordionTab>
        <AccordionTab header="Imagenes">
          <div className="grid-col-4">
            {files
              .filter((i) => i.file.split(".")[1] !== "pdf" && i)
              .map((i: any) => (
                <div key={i._id} className="relative">
                  <div className="absolute z-5 right-0 -top-5 overflow-hidden">
                    <MyConfirmPopup
                      message="Estas seguro de borrar el archivo?"
                      iconButton="pi pi-trash"
                      accept={() => console.log("p")}
                      className="bg-pink-400 border-none w-2rem"
                    />
                  </div>
                  <Image
                    key={i.file}
                    src={`http://localhost:3000/uploads/${i.file}`}
                    alt="Image"
                    width="200"
                    preview
                  />
                </div>
              ))}
          </div>
        </AccordionTab>
      </Accordion>
    </>
  );
}

export default FilesSection;
