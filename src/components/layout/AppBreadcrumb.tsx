import React, { ChangeEvent, EventHandler, useState } from "react";
import { useLocation } from "react-router-dom";
import { classNames } from "primereact/utils";
import { BreadCrumb } from "primereact/breadcrumb";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
// import DocumentCard from "../documents/DocumentCard";
import { ProgressSpinner } from "primereact/progressspinner";
import { MultiSelect, MultiSelectProps } from "primereact/multiselect";
import { Calendar, CalendarProps } from "primereact/calendar";

const cities = [
  { name: "New York", code: "NY" },
  { name: "Rome", code: "RM" },
  { name: "London", code: "LDN" },
  { name: "Istanbul", code: "IST" },
  { name: "Paris", code: "PRS" },
];

const AppBreadcrumb = (props: any) => {
  const [search, setSearch] = useState("");
  const [selectedCities, setSelectedCities] = useState([]);
  const [dates2, setDates2] = useState<any>("");

  const location = useLocation();

  let items;

  if (location.pathname === "/") {
    items = [{ label: "Dashboard" }];
  }
  if (location.pathname === "/documentos") {
    items = [{ label: "Documentos" }];
  }
  if (location.pathname === "/flujos") {
    items = [{ label: "Administracion" }];
  }
  if (location.pathname === "/kanba") {
    items = [{ label: "Kanban" }];
  }
  if (location.pathname === "/perfil") {
    items = [{ label: "Mis tareas" }];
  }
  if (location.pathname === "/area") {
    items = [{ label: "Area" }];
  }
  if (location.pathname === "/direcciones") {
    items = [{ label: "Direcciones" }];
  }

  const isStatic = () => {
    return props.menuMode === "static";
  };

  return (
    <div className="layout-breadcrumb-container">
      <div className="layout-breadcrumb-left-items">
        {isStatic() && (
          <button
            className="menu-button p-link"
            onClick={props.onMenuButtonClick}
          >
            <i className="pi pi-bars"></i>
          </button>
        )}

        <BreadCrumb
          model={items}
          className={`layout-breadcrumb font-bold ${
            location.pathname === "/" && "dark"
          }`}
        />
      </div>

      {/* SEARCH */}
      <div className="layout-breadcrumb-right-items">
        <button
          tabIndex={0}
          className="search-icon p-link"
          onClick={props.breadcrumbClick}
        >
          <i className="pi pi-search"></i>
        </button>

        {/* CONTAINER */}
        <div
          className={classNames("search-wrapper", {
            "active-search-wrapper": props.searchActive,
          })}
        >
          <div className="search-box">
            <button className="btn-search">
              <i className="pi pi-search"></i>
            </button>
            <input
              type="text"
              className="input-search"
              placeholder="Escribe para buscar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div
              className={`search-box-results shadow-2 z-3 ${search && "p-5"} `}
              style={{ height: search ? "fit-content" : "0px" }}
            >
              <div className="flex">
                <div className="p-float-label mr-2">
                  <MultiSelect
                    display="chip"
                    optionLabel="name"
                    value={selectedCities}
                    options={cities}
                    onChange={(e: MultiSelectProps) =>
                      setSelectedCities(e.value)
                    }
                    className="w-12rem"
                  />
                  <label htmlFor="search">Filtro de Procesos</label>
                </div>
                <div className="p-input-icon-right p-float-label mr-2">
                  <i className="pi pi-calendar" />
                  <Calendar
                    id="range"
                    value={dates2}
                    onChange={(e: CalendarProps) => setDates2(e.value)}
                    selectionMode="range"
                    readOnlyInput
                  />
                  <label htmlFor="search">Filtrar por fecha</label>
                </div>
              </div>

              <hr />

              <h3 className="mb-5">Documentos</h3>
              <div className="grid gap-2">
                {/* <DocumentCard notProgress />
                <DocumentCard notProgress />
                <DocumentCard notProgress /> */}
              </div>
              <hr />

              <h3 className="mb-5">Flujos</h3>
              <div className="grid gap-2">
                <div className="card shadow-2">Proceso de nomina</div>
                <div className="card shadow-2">Proceso de nomina</div>
                <div className="card shadow-2">Proceso de nomina</div>
              </div>
            </div>
          </div>
        </div>

        <span className="layout-rightmenu-button-desktop">
          <Button
            label="Mis actividades"
            icon="pi pi-bookmark"
            className="layout-rightmenu-button btn-red"
            onClick={props.onRightMenuButtonClick}
          ></Button>
        </span>

        <span className="layout-rightmenu-button-mobile">
          <Button
            icon="pi pi-bookmark"
            className="layout-rightmenu-button"
            onClick={props.onRightMenuButtonClick}
          ></Button>
        </span>
      </div>
    </div>
  );
};

export default AppBreadcrumb;
